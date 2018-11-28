const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${path.join(__dirname, "../")}public/images/`);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage: storage });
const NewsController = require("../controllers/News");
const verifyToken = require("../controllers/VerifyToken");
router.get("/", NewsController.getAllNews);
router.get("/:id", NewsController.getNews);
router.post(
  "/",
  verifyToken,
  upload.array("images", 5),
  NewsController.createNews
);
router.put("/:id", verifyToken, NewsController.updateNews);
router.delete("/:id", verifyToken, NewsController.deleteNews);

module.exports = router;
