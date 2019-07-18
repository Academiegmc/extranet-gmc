const mongoose = require("mongoose");
const Schema = mongoose.Schema;
module.exports = UserFiles = mongoose.model(
  "JobsFiles",
  new Schema({}, { strict: false }),
  "jobs-upload.files"
);
