const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
  status: { type: Number, required: true },
  profile_pic: { type: Schema.Types.ObjectId, ref: "UserFiles" },
  experiences: [
    {
      company_name: { type: String, required: true },
      poste: { type: String, required: true },
      description: { type: String, required: true },
      start_date: { type: Date, required: true },
      end_date: { type: Date, required: true }
    }
  ],
  convention: { type: Schema.Types.ObjectId, ref: "UserFiles" },
  letters: [{ type: Schema.Types.ObjectId, ref: "gmc-letters" }],
  personal_sheet: { type: Schema.Types.ObjectId, ref: "UserFiles" }
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
    experiences: this.experiences,
    convention: this.convention,
    letters: this.letters,
    personal_sheet: this.personal_sheet,
    status: this.status
  };
};
UserSchema.methods.getProfileInfos = function() {
  return {
    id: this._id,
    name: this.name,
    profile_pic: this.profile_pic,
    experiences: this.experiences,
    convention: this.convention,
    letters: this.letters,
    personal_sheet: this.personal_sheet,
    status: this.status
  };
};
module.exports = User = mongoose.model("gmc-users", UserSchema);
