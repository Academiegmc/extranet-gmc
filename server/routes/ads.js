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

router.get("/image/:type/:id", initGridFSMulter, async (req, res) => {
  const { gfs } = req.gridFSMulter;
  const filesQuery = await gfs.s._filesCollection.find({
    _id: mongoose.Types.ObjectId(req.params.id)
  });
  filesQuery.toArray((error, docs) => {
    if (error) res.status(400).json({ message: "Bad Request" });
    let files;
    let file;
    if (docs.length > 0) {
      if (docs.length > 1) files = docs;
      else {
        file = docs[0];
        if (!file || file.length === 0) {
          return res.status(404).json({
            error: "No file found"
          });
        }
        //Check if image
        if (
          file.contentType === "image/jpeg" ||
          file.contentType === "image/png"
        ) {
          //Read output to browser
          const readstream = gfs.openDownloadStreamByName(file.filename);
          readstream.pipe(res);
        } else {
          return res.status(404).json({
            error: "Not an image"
          });
        }
      }
    }
  });
});
router.get("/", verifyToken, Ads.getAllAds);
router.get("/title", verifyToken, Ads.searchAds);
router.post("/", verifyToken, upload.array("images", 5), Ads.createAd);
router.get("/:type/:id", initGridFSMulter, verifyToken, Ads.getAd);
router.get("/user/:type/:id", initGridFSMulter, verifyToken, Ads.getAllUserAds);
router.post("/edit/:id/comments", verifyToken, Ads.updateCommentAd);
router.put(
  "/edit/:type/:id",
  verifyToken,
  upload.array("images", 5),
  initGridFSMulter,
  Ads.updateAd
);
router.delete("/:type/:id", verifyToken, Ads.deleteAd);

module.exports = router;
