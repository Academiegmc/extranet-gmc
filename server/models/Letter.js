const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LetterSchema = new Schema({
  author: { type: String, required: true },
  text: { type: String, required: true }
});
module.exports = Letter = mongoose.model("gmc-letters", LetterSchema);
