const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
  status: { type: Number, required: true },
  profile_pic: { type: String },
  experiences: { type: [{}] },
  convention: { type: String },
  letters: { type: [{}] },
  personal_sheet: { type: String }
});
/*
  Status :
    0 : Elève
    1 : Ancien élève
    2 : Prof
    3 : Admin
    4 : Entreprise
*/

UserSchema.methods.getInfos = function() {
  return {
    id: this._id,
    name: this.name,
    profile_pic: this.profile_pic,
    status: this.status
  };
};
module.exports = User = mongoose.model("gmc-users", UserSchema);
