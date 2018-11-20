const express = require("express");
const router = express.Router();
const Users = require("../controllers/Users");
const verifyToken = require("../controllers/VerifyToken");

router.get("/", Users.getAllUsers);
router.get("/:id/jobs", verifyToken, Users.getUserJobs);
router.get("/:id/ads", verifyToken, Users.getUserAds);
router.get("/:id/news", verifyToken, Users.getUserNews);
router.post("/login", Users.login);
module.exports = router;
