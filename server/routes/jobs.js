const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const Jobs = require("../controllers/Jobs");
const verifyToken = require("../controllers/VerifyToken");
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
const fileSizeLimit = 2000000;
const upload = multer({
  storage: storage,
  limits: { fileSize: fileSizeLimit },
  fileFilter: (req, file, cb) => {
    console.log("file:", path.extname(file.originalname));
    if (path.extname(file.originalname) !== ".pdf") {
      cb(new Error("File isn't a PDF!"));
    } else {
      cb(null, true);
    }
  }
});

router.get("/", Jobs.getAllJobs);
router.get("/search", Jobs.searchJobs);
router.post("/", verifyToken, Jobs.createJobs);
router.post(
  "/application",
  verifyToken,
  upload.single("cv"),
  Jobs.sendApplication
);
router.get("/:id", verifyToken, Jobs.getJob);
router.put("/edit/:id", verifyToken, Jobs.updateJobs);
router.delete("/:id", Jobs.deleteJobs);
module.exports = router;
