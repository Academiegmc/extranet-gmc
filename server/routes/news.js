const express = require("express");
const multer = require("multer");

const NewsController = require("../controllers/News");
const verifyToken = require("../controllers/VerifyToken");
const { initGridFSMulter, initStorage } = require("../services/gridFSMulter");

const router = express.Router();
const fileSizeLimit = 2000000;
const upload = multer({
  storage: initStorage("news-upload"),
  limits: { fileSize: fileSizeLimit }
});

router.get("/image/:id", initGridFSMulter, (req, res) => {
  const { gfs } = req.gridFSMulter;
  console.log({ _id: req.params.id });
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
router.get("/pdf/:id", (req, res) => {
  const { gfs } = req.gridFSMulter;
  gfs.findOne({ _id: req.params.id }, (err, file) => {
    if (err) return res.status(400).json({ error: "Bad Request" });
    // console.log(file);
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
router.delete("/image/:id", initGridFSMulter, (req, res) => {
  const { gfs } = req.gridFSMulter;
  gfs.exist({ _id: req.params.id }, (err, found) => {
    if (err) return handleError(err);
    if (found) {
      console.log("File exists");
      gfs.remove({ _id: found._id }, (err, gridStore) => {
        if (err) return res.status(400).json({ err: "Bad Request" });
        console.log("success");
        res.status(200).json({ status: "success" });
      });
    } else {
      console.log("File does not exist");
    }
  });
});
router.get("/", verifyToken, NewsController.getAllNews);
router.get("/:id", verifyToken, NewsController.getNews);
router.get("/user/:id", verifyToken, NewsController.getAllUserNews);
router.post(
  "/edit/:id/comments",
  verifyToken,
  NewsController.updateCommentNews
);
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
