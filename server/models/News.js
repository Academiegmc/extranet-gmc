const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");
const GFS = mongoose.model(
  "NewsFiles",
  new Schema({}, { strict: false }),
  "news-upload.files"
);
const NewsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: Schema.Types.ObjectId, ref: "NewsFiles" }],
  date: { type: Date, default: Date.now }
});
NewsSchema.methods.getData = async function() {
  let userData;
  try {
    userData = await User.findById(this.user);
  } catch (error) {
    console.error(error);
  }
  return {
    id: this._id,
    name: this.name,
    title: this.title,
    description: this.description,
    images: this.images,
    date: this.date,
    user: userData.getInfos()
  };
};
module.exports = NewsModel = mongoose.model("gmcnews", NewsSchema);
