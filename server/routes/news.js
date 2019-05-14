const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const crypto = require("crypto");
const GridFsStorage = require("multer-gridfs-storage");
const GridFsStream = require("gridfs-stream");
const router = express.Router();
eval(
  `GridFsStream.prototype.findOne = ${GridFsStream.prototype.findOne
    .toString()
    .replace("nextObject", "next")}`
);
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
  gfs.collection("news-upload");
  console.log("News gridfs connection");
});
// Create Multer Storage
const fileSizeLimit = 2000000;
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
          bucketName: "news-upload"
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({
  storage,
  limits: { fileSize: fileSizeLimit }
});
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, `${path.join(__dirname, "../")}public/images/`);
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   }
// });
// const fileSizeLimit = 2000000;
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: fileSizeLimit }
// });
const NewsController = require("../controllers/News");
const verifyToken = require("../controllers/VerifyToken");
router.get("/image/:id", (req, res) => {
  gfs.findOne({ _id: req.params.id }, (err, file) => {
    if (err) return res.status(400).json({ err: "Bad Request" });
    if (!file || file.length === 0) {
      return res.status(404).json({
        error: "No file found"
      });
    }
    console.log(file);
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
router.get("/", NewsController.getAllNews);
router.get("/:id", NewsController.getNews);
router.get("/user/:id", verifyToken, NewsController.getAllUserNews);
router.post(
  "/",
  verifyToken,
  upload.array("images", 5),
  NewsController.createNews
);
router.put(
  "/:id",
  verifyToken,
  upload.array("images", 5),
  NewsController.updateNews
);
router.delete("/:id", verifyToken, NewsController.deleteNews);

module.exports = router;
