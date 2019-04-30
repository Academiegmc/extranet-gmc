const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");
const AdSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: { type: String, required: true },
      date: { type: Date, default: Date.now }
    }
  ],
  date: { type: Date, default: Date.now }
});

// module.exports = Ad = mongoose.model("gmc-ads", AdSchema);

AdSchema.methods.getData = async function() {
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
    category: this.category,
    comments: this.comments,
    date: this.date,
    user: userData.getInfos()
  };
};
module.exports = Ad = mongoose.model("gmcads", AdSchema);
