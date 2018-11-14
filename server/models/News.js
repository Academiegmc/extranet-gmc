const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [],
  date: { type: Date, default: Date.now }
});

module.exports = NewsModel = mongoose.model("gmc-news", NewsSchema);
