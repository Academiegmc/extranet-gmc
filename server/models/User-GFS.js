const mongoose = require("mongoose");
const Schema = mongoose.Schema;
module.exports = UserFiles = mongoose.model(
  "UserFiles",
  new Schema({}, { strict: false }),
  "users-upload.files"
);
