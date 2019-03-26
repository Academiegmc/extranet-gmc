const express = require("express");
const path = require("path");
const multer = require("multer");

const Users = require("../controllers/Users");
const verifyToken = require("../controllers/VerifyToken");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${path.join(__dirname, "../")}public/pdf/`);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});
const fileSizeLimit = 2000000;
const upload = multer({
  storage: storage,
  limits: { fileSize: fileSizeLimit }
});

const router = express.Router();
router.get("/all", Users.getAllUsers);
router.post("/", Users.create);
router.get("/:id", verifyToken, Users.getUser);
router.get("/:id/jobs", verifyToken, Users.getUserJobs);
router.get("/:id/ads", verifyToken, Users.getUserAds);
router.get("/:id/news", verifyToken, Users.getUserNews);
router.put(
  "/",
  verifyToken,
  upload.fields([
    { name: "renseignement", maxCount: 1 },
    { name: "convention", maxCount: 1 },
    { name: "recommandation", maxCount: 3 }
  ]),
  Users.update
);
router.delete("/:id", verifyToken, Users.delete);
router.post("/login", Users.login);
module.exports = router;
