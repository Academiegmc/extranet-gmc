const express = require("express");
const multer = require("multer");

const Ads = require("../controllers/Ads");
const verifyToken = require("../controllers/VerifyToken");
const { initStorage, initGridFSMulter } = require("../services/gridFSMulter");

const router = express.Router();
const fileSizeLimit = 2000000;
const upload = multer({
  storage: initStorage("ads-upload"),
  limits: { fileSize: fileSizeLimit }
});

router.get("/image/:id", initGridFSMulter, (req, res) => {
  const { gfs } = req.gridFSMulter;
  gfs.findOne({ _id: req.params.id }, (err, file) => {
    if (err) return res.status(400).json({ err: "Bad Request" });
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
router.get("/", verifyToken, Ads.getAllAds);
router.get("/title", verifyToken, Ads.searchAds);
router.post("/", verifyToken, upload.array("images", 5), Ads.createAd);
router.get("/:id", verifyToken, Ads.getAd);
router.get("/user/:id", verifyToken, Ads.getAllUserAds);
router.post("/edit/:id/comments", verifyToken, Ads.updateCommentAd);
router.put("/edit/:id", verifyToken, upload.array("images", 5), Ads.updateAd);
router.delete("/:id", verifyToken, Ads.deleteAd);

module.exports = router;
