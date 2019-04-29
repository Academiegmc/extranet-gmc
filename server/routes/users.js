const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const crypto = require("crypto");
const GridFsStorage = require("multer-gridfs-storage");
const GridFsStream = require("gridfs-stream");
eval(
  `GridFsStream.prototype.findOne = ${GridFsStream.prototype.findOne
    .toString()
    .replace("nextObject", "next")}`
);
const Users = require("../controllers/Users");
const verifyToken = require("../controllers/VerifyToken");
const config = require("../config/mongo-key");
mongoose.Promise = global.Promise;
mongoose.set("debug", true);
const connection = mongoose.createConnection(config.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true
});
let gfs;
connection.on("open", () => {
  // Init stream
  gfs = GridFsStream(connection.db, mongoose.mongo);
  gfs.collection("users-upload");
  console.log("User gridfs connection");
});

// Create Multer Storage
const storage = new GridFsStorage({
  url: config.mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "users-upload"
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({
  storage
});
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     if (file.fieldname === "profile_pic") {
//       cb(null, `${path.join(__dirname, "../")}public/profiles/`);
//     } else {
//       cb(null, `${path.join(__dirname, "../")}public/pdf/`);
//     }
//   },
//   filename: (req, file, cb) => {
//     if (file.fieldname === "profile_pic") {
//       if (path.extname(file.originalname) === "") {
//         cb(
//           null,
//           file.fieldname + "-" + req.user.name.replace(" ", "-").trim() + ".jpg"
//         );
//       } else {
//         cb(
//           null,
//           file.fieldname + "-" + req.user.name + path.extname(file.originalname)
//         );
//       }
//     } else {
//       cb(
//         null,
//         file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//       );
//     }
//   },
//   fileFilter: (req, file, cb) => {
//     // The function should call `cb` with a boolean
//     // to indicate if the file should be accepted
//     if (
//       path.extname(file.originalname) !== "pdf" ||
//       path.extname(file.originalname) !== "jpg" ||
//       path.extname(file.originalname) !== "png"
//     ) {
//       // To reject this file pass `false`, like so:
//       cb(null, false);
//     } else {
//       // To accept the file pass `true`, like so:
//       cb(null, true);
//     }

//     // You can always pass an error if something goes wrong:
//     cb(new Error("I don't have a clue!"));
//   }
// });
// const fileSizeLimit = 2000000;
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: fileSizeLimit }
// });

const router = express.Router();
router.get("/all", Users.getAllUsers);
router.get("/image/:id", async (req, res) => {
  const file = await gfs.files.findOne({ _id: req.params.id });
  if (!file || file.length === 0) {
    return res.status(404).json({
      error: "No file found"
    });
  }
  //Check if image
  if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
    //Read output to browser
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  } else {
    return res.status(404).json({
      error: "Not an image"
    });
  }
});
router.get("/pdf/:id", (req, res) => {
  gfs.findOne({ _id: req.params.id }, function(err, file) {
    if (err) return res.status(400).json({ error: "Bad Request" });
    console.log(file);
    if (!file || file.length === 0) {
      return res.status(404).json({
        error: "No file found"
      });
    }
    //Check if image
    if (file.contentType === "application/pdf") {
      //Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      return res.status(404).json({
        error: "Not a PDF"
      });
    }
  });
});
router.post("/", Users.create);
router.get("/:id", verifyToken, Users.getUser);
router.get("/:id/jobs", verifyToken, Users.getUserJobs);
router.get("/:id/ads", verifyToken, Users.getUserAds);
router.get("/:id/news", verifyToken, Users.getUserNews);
router.put(
  "/",
  verifyToken,
  upload.fields([
    { name: "profile_pic", maxCount: 1 },
    { name: "renseignement", maxCount: 1 },
    { name: "convention", maxCount: 1 },
    { name: "recommandation", maxCount: 3 }
  ]),
  Users.update
);
// router.put(
//   "/",
//   verifyToken,
//   upload.fields([
//     { name: "profile_pic", maxCount: 1 },
//     { name: "renseignement", maxCount: 1 },
//     { name: "convention", maxCount: 1 },
//     { name: "recommandation", maxCount: 3 }
//   ]),
//   Users.update
// );
router.delete("/:id", verifyToken, Users.delete);
router.post("/login", Users.login);
module.exports = router;
