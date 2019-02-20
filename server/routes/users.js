const express = require("express");
const router = express.Router();
const Users = require("../controllers/Users");
const verifyToken = require("../controllers/VerifyToken");

router.get("/all", Users.getAllUsers);
router.get("/", verifyToken, Users.getUser);
router.get("/:id/jobs", verifyToken, Users.getUserJobs);
router.get("/:id/ads", verifyToken, Users.getUserAds);
router.get("/:id/news", verifyToken, Users.getUserNews);
router.put("/", verifyToken, Users.update);
router.delete("/:id", verifyToken, Users.delete);
router.post("/login", Users.login);
module.exports = router;
