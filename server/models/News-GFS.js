const mongoose = require("mongoose");
const Schema = mongoose.Schema;
module.exports = UserFiles = mongoose.model(
  "NewsFiles",
  new Schema({}, { strict: false }),
  "news-upload.files"
);
