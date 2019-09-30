const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");

const Users = require("../controllers/Users");
const verifyToken = require("../controllers/VerifyToken");
const { initStorage, initGridFSMulter } = require("../services/gridFSMulter");

const router = express.Router();
const upload = multer({
  storage: initStorage("users-upload")
});

router.get("/all", Users.getAllUsers);
router.get("/image/:type/:id", initGridFSMulter, async (req, res) => {
  const { gfs } = req.gridFSMulter;
  const filesQuery = await gfs.s._filesCollection.find({
    _id: mongoose.Types.ObjectId(req.params.id)
  });
  filesQuery.toArray((error, docs) => {
    if (error) res.status(400).json({ message: "Bad Request" });
    let files;
    let file;
    if (docs.length > 0) {
      if (docs.length > 1) files = docs;
      else {
        file = docs[0];
        if (!file || file.length === 0) {
          return res.status(404).json({
            error: "No file found"
          });
        }
        //Check if image
        if (
          file.contentType === "image/jpeg" ||
          file.contentType === "image/png"
        ) {
          //Read output to browser
          const readstream = gfs.openDownloadStreamByName(file.filename);
          readstream.pipe(res);
        } else {
          return res.status(404).json({
            error: "Not an image"
          });
        }
      }
    }
  });
});
router.get("/pdf/:id", async (req, res) => {
  const { gfs } = req.gridFSMulter;
  const filesQuery = await gfs.s._filesCollection.find({
    _id: mongoose.Types.ObjectId(req.params.id)
  });
  filesQuery.toArray((error, docs) => {
    if (error) res.status(400).json({ message: "Bad Request" });
    let files;
    let file;
    if (docs.length > 0) {
      if (docs.length > 1) files = docs;
      else {
        file = docs[0];
        if (!file || file.length === 0) {
          return res.status(404).json({
            error: "No file found"
          });
        }
        //Check if image
        if (file.contentType === "application/pdf") {
          //Read output to browser
          const readstream = gfs.openDownloadStreamByName(file.filename);
          readstream.pipe(res);
        } else {
          return res.status(404).json({
            error: "Not an image"
          });
        }
      }
    }
  });
});
router.post("/", verifyToken, Users.create);
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
    { name: "convention", maxCount: 1 }
  ]),
  initGridFSMulter,
  Users.update
);
router.delete("/:id", verifyToken, initGridFSMulter, Users.delete);
router.delete("/job/:id", verifyToken, Users.deleteUserJobs);
router.delete(
  "/news/:type/:id",
  verifyToken,
  initGridFSMulter,
  Users.deleteUserNews
);
router.delete(
  "/annonce/:type/:id",
  verifyToken,
  initGridFSMulter,
  Users.deleteUserAds
);
router.post("/login", Users.login);
module.exports = router;
