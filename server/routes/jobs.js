const express = require("express");
const router = express.Router();
const Jobs = require("../controllers/Jobs");
const verifyToken = require("../controllers/VerifyToken");

router.get("/", Jobs.getAllJobs);
router.get("/:id", Jobs.getJob);
router.post("/", verifyToken, Jobs.createJobs);
router.put("/edit/:id", verifyToken, Jobs.updateJobs);
router.delete("/:id", Jobs.deleteJobs);
router.post("/application", verifyToken, Jobs.sendApplication);
module.exports = router;
