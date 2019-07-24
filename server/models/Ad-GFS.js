const mongoose = require("mongoose");
const Schema = mongoose.Schema;
module.exports = UserFiles = mongoose.model(
  "AdsFiles",
  new Schema({}, { strict: false }),
  "ads-upload.files"
);
