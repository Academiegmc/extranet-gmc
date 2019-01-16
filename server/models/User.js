const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
  status: { type: Number, required: true }
});
/*
  Status :
    0 : Elève
    1 : Ancien élève
    2 : Prof
    3 : Admin
    4 : Entreprise
*/
module.exports = User = mongoose.model("gmc-users", UserSchema);
