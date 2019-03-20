const express = require("express");
const router = express.Router();
const Ads = require("../controllers/Ads");
const verifyToken = require("../controllers/VerifyToken");

router.get("/", Ads.getAllAds);
router.get("/title", verifyToken, Ads.searchAds);
router.post("/", verifyToken, Ads.createAd);
router.get("/:id", Ads.getAd);
router.get("/user/:id", verifyToken, Ads.getAllUserAds);
router.post("/edit/:id/comments", verifyToken, Ads.updateCommentAd);
router.put("/edit/:id", verifyToken, Ads.updateAd);
router.delete("/:id", verifyToken, Ads.deleteAd);

module.exports = router;
