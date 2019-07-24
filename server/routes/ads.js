const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Ads = require("../controllers/Ads");
const verifyToken = require("../controllers/VerifyToken");
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
  gfs.collection("ads-upload");
  console.log("Ads gridfs connection");
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
          bucketName: "ads-upload"
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

router.get("/image/:id", (req, res) => {
  gfs.findOne({ _id: req.params.id }, (err, file) => {
    if (err) return res.status(400).json({ err: "Bad Request" });
    if (!file || file.length === 0) {
      return res.status(404).json({
        error: "No file found"
      });
    }
    // console.log(file);
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

router.get("/", Ads.getAllAds);
router.get("/title", verifyToken, Ads.searchAds);
router.post("/", verifyToken, upload.array("images", 5), Ads.createAd);
router.get("/:id", Ads.getAd);
router.get("/user/:id", verifyToken, Ads.getAllUserAds);
router.post("/edit/:id/comments", verifyToken, Ads.updateCommentAd);
router.put("/edit/:id", verifyToken, upload.array("images", 5), Ads.updateAd);
router.delete("/:id", verifyToken, Ads.deleteAd);

module.exports = router;
