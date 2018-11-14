const express = require("express");
const router = express.Router();
const NewsController = require("../controllers/News");
const verifyToken = require("../controllers/VerifyToken");
router.get("/", NewsController.getAllNews);
router.get("/:id", NewsController.getNews);
router.post("/", verifyToken, NewsController.createNews);
router.put("/edit/:id", verifyToken, NewsController.updateNews);
router.delete("/delete/:id", verifyToken, NewsController.deleteNews);

module.exports = router;
