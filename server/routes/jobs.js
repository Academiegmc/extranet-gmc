const express = require("express");
const router = express.Router();
const Jobs = require("../controllers/Jobs");
const verifyToken = require("../controllers/VerifyToken");

router.get("/", Jobs.getAllJobs);
router.get("/search", Jobs.searchJobs);
router.post("/", verifyToken, Jobs.createJobs);
router.post("/application", verifyToken, Jobs.sendApplication);
router.get("/:id", verifyToken, Jobs.getJob);
router.put("/edit/:id", verifyToken, Jobs.updateJobs);
router.delete("/:id", Jobs.deleteJobs);
module.exports = router;
