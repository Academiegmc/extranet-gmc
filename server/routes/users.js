const express = require("express");
const path = require("path");
const multer = require("multer");

const Users = require("../controllers/Users");
const verifyToken = require("../controllers/VerifyToken");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "profile_pic") {
      cb(null, `${path.join(__dirname, "../")}public/profiles/`);
    } else {
      cb(null, `${path.join(__dirname, "../")}public/pdf/`);
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === "profile_pic") {
      if (path.extname(file.originalname) === "") {
        cb(
          null,
          file.fieldname + "-" + req.user.name.replace(" ", "-").trim() + ".jpg"
        );
      } else {
        cb(
          null,
          file.fieldname + "-" + req.user.name + path.extname(file.originalname)
        );
      }
    } else {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    }
  },
  fileFilter: (req, file, cb) => {
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
    if (
      path.extname(file.originalname) !== "pdf" ||
      path.extname(file.originalname) !== "jpg" ||
      path.extname(file.originalname) !== "png"
    ) {
      // To reject this file pass `false`, like so:
      cb(null, false);
    } else {
      // To accept the file pass `true`, like so:
      cb(null, true);
    }

    // You can always pass an error if something goes wrong:
    cb(new Error("I don't have a clue!"));
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
    { name: "profile_pic", maxCount: 1 },
    { name: "renseignement", maxCount: 1 },
    { name: "convention", maxCount: 1 },
    { name: "recommandation", maxCount: 3 }
  ]),
  Users.update
);
router.delete("/:id", verifyToken, Users.delete);
router.post("/login", Users.login);
module.exports = router;
