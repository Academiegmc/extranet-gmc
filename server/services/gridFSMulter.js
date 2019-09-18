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

  if (req.headers.referer.includes("annonce")) collection = "ads-upload";
  if (req.headers.referer.includes("news")) collection = "news-upload";
  mongoose.Promise = global.Promise;
  mongoose.set("debug", true);
  const connection = mongoose.createConnection(config.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true
  });
  connection.on("open", () => {
    // Init stream
    gfs = GridFsStream(connection.db, mongoose.mongo);
    gfs.collection(collection);
    console.log(collection + " : gridfs connection");
    req.gridFSMulter = {
      gfs
    };
    next();
  });
};

module.exports = { initGridFSMulter, initStorage };
