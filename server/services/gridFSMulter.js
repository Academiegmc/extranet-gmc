const mongoose = require("mongoose");
const path = require("path");
const crypto = require("crypto");
const GridFsStorage = require("multer-gridfs-storage");
const GridFsStream = require("gridfs-stream");
const config = require("../config/mongo-key");
eval(
  `GridFsStream.prototype.findOne = ${GridFsStream.prototype.findOne
    .toString()
    .replace("nextObject", "next")}`
);

const initStorage = collection => {
  // Create Multer Storage
  const storage = new GridFsStorage({
    url: config.mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename =
            buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: collection
          };
          resolve(fileInfo);
        });
      });
    }
  });
  return storage;
};
const initGridFSMulter = (req, res, next) => {
  let gfs;
  let collection;

  if (req.params.type === "user") collection = "users-upload";
  if (req.params.type === "annonce") collection = "ads-upload";
  if (req.params.type === "news") collection = "news-upload";

  mongoose.Promise = global.Promise;
  mongoose.set("debug", true);
  const connection = mongoose.createConnection(config.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true
  });
  connection.on("open", () => {
    // Init stream
    gfs = new mongoose.mongo.GridFSBucket(connection.db, {
      bucketName: collection
    });
    console.log("Passing to next function");
    req.gridFSMulter = {
      gfs
    };
    next();
  });
};

const deleteGridFSBucket = async (gfs, chunks, files, id) => {
  const chunksQuery = await chunks.find({
    files_id: id
  });
  const filesQuery = await files.find({ _id: id });
  await gfs.delete(id);
  chunksQuery.toArray((error, docs) => {
    if (error) return res.status(400).json({ message: "Bad Request" });
  });
  filesQuery.toArray((error, docs) => {
    if (error) return res.status(400).json({ message: "Bad Request" });
  });
};
module.exports = { initGridFSMulter, initStorage, deleteGridFSBucket };
