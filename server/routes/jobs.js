const express = require("express");
const path = require("path");
const multer = require("multer");

const verifyToken = require("../controllers/VerifyToken");
const Jobs = require("../controllers/Jobs");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${path.join(__dirname, "../")}public/cv/`);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      req.user.name.replace(" ", "-") +
        "-" +
        file.fieldname +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  }
});
const fileSizeLimit = 20000000;
const upload = multer({
  storage: storage,
  limits: { fileSize: fileSizeLimit },
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname) !== ".pdf") {
      cb(new Error("File isn't a PDF!"));
    } else {
      cb(null, true);
    }
  }
});

router.get("/", verifyToken, Jobs.getAllJobs);
router.get("/search", verifyToken, Jobs.searchJobs);
router.post("/", verifyToken, Jobs.createJobs);
router.post(
  "/:id/application",
  verifyToken,
  upload.single("cv"),
  Jobs.sendApplication
);
router.get("/:id", verifyToken, Jobs.getJob);
router.get("/user/:id", verifyToken, Jobs.getAllUserAds);
router.put("/edit/:id", verifyToken, Jobs.updateJobs);
router.delete("/:id", Jobs.deleteJobs);
module.exports = router;
