const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");
const crypto = require("crypto");
const GridFsStorage = require("multer-gridfs-storage");
const GridFsStream = require("gridfs-stream");

const verifyToken = require("../controllers/VerifyToken");
const Jobs = require("../controllers/Jobs");

// eval(
//   `GridFsStream.prototype.findOne = ${GridFsStream.prototype.findOne
//     .toString()
//     .replace("nextObject", "next")}`
// );
// const config = require("../config/mongo-key");
// mongoose.Promise = global.Promise;
// mongoose.set("debug", true);
// const connection = mongoose.createConnection(config.mongoURI, {
//   useNewUrlParser: true,
//   useCreateIndex: true
// });
// let gfs;
// connection.on("open", () => {
//   // Init stream
//   gfs = GridFsStream(connection.db, mongoose.mongo);
//   gfs.collection("jobs-upload");
//   console.log("Jobs gridfs connection");
// });
// // Create Multer Storage
// const fileSizeLimit = 2000000;
// const storage = new GridFsStorage({
//   url: config.mongoURI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString("hex") + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: "jobs-upload"
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });
// const upload = multer({
//   storage,
//   limits: { fileSize: fileSizeLimit }
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${path.join(__dirname, "../")}public/cv/`);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      req.user.name.replace(" ", "-") +
        "-" +
        file.fieldname +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  }
});
const fileSizeLimit = 20000000;
const upload = multer({
  storage: storage,
  limits: { fileSize: fileSizeLimit },
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname) !== ".pdf") {
      cb(new Error("File isn't a PDF!"));
    } else {
      cb(null, true);
    }
  }
});

router.get("/", Jobs.getAllJobs);
router.get("/search", Jobs.searchJobs);
router.post("/", verifyToken, Jobs.createJobs);
router.post(
  "/application",
  verifyToken,
  upload.single("cv"),
  Jobs.sendApplication
);
router.get("/:id", verifyToken, Jobs.getJob);
router.get("/user/:id", verifyToken, Jobs.getAllUserAds);
router.put("/edit/:id", verifyToken, Jobs.updateJobs);
router.delete("/:id", Jobs.deleteJobs);
module.exports = router;
