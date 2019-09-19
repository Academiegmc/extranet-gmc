const express = require("express");
const multer = require("multer");

const Users = require("../controllers/Users");
const verifyToken = require("../controllers/VerifyToken");
const { initStorage, initGridFSMulter } = require("../services/gridFSMulter");

const router = express.Router();
const upload = multer({
  storage: initStorage("users-upload")
});

router.get("/all", Users.getAllUsers);
router.get("/image/:id", initGridFSMulter, (req, res) => {
  const { gfs } = req.gridFSMulter;

  gfs.findOne({ _id: req.params.id }, (err, file) => {
    if (err) return res.status(400).json({ err: "Bad Request" });
    if (!file || file.length === 0) {
      return res.status(404).json({
        error: "No file found"
      });
    }
    //Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      //Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      return res.status(404).json({
        error: "Not an image"
      });
    }
  });
});
router.get("/pdf/:id", (req, res) => {
  const { gfs } = req.gridFSMulter;

  gfs.findOne({ _id: req.params.id }, (err, file) => {
    if (err) return res.status(400).json({ error: "Bad Request" });
    console.log(file);
    if (!file || file.length === 0) {
      return res.status(404).json({
        error: "No file found"
      });
    }
    //Check if image
    if (file.contentType === "application/pdf") {
      //Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      return res.status(404).json({
        error: "Not a PDF"
      });
    }
  });
});
router.delete("/image/:id", initGridFSMulter, (req, res) => {
  const { gfs } = req.gridFSMulter;
  gfs.exist({ _id: req.params.id }, (err, found) => {
    if (err) return handleError(err);
    if (found) {
      console.log("File exists");
      gfs.remove({ _id: found._id }, (err, gridStore) => {
        if (err) return res.status(400).json({ err: "Bad Request" });
        console.log("success");
        res.status(200).json({ status: "success" });
      });
    } else {
      console.log("File does not exist");
    }
  });
});
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
