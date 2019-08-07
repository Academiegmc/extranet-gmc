const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  jobContractType: { type: String, required: true },
  jobType: { type: String, required: true },
  jobRemuneration: { type: String, required: true },
  jobStartDate: { type: Date, required: true, default: Date.now },
  jobSkills: [String],
  jobCity: { type: String, required: true },
  jobCountry: { type: String, required: true },
  jobCompany: { type: String, required: true },
  jobCompanyDescription: { type: String, required: true },
  jobCompanySite: { type: String, required: true },
  jobCandidates: [{ type: Schema.Types.ObjectId, ref: "users" }],
  createdAt: { type: Date, required: true, default: Date.now }
});
jobSchema.methods.getData = async function() {
  let userData;
  try {
    userData = await User.findById(this.user);
  } catch (error) {
    console.error(error);
  }
  return {
    id: this._id,
    jobTitle: this.jobTitle,
    jobDescription: this.jobDescription,
    jobContractType: this.jobContractType,
    jobType: this.jobType,
    jobRemuneration: this.jobRemuneration,
    jobStartDate: this.jobStartDate,
    jobSkills: this.jobSkills,
    jobCity: this.jobCity,
    jobCountry: this.jobCountry,
    jobCompany: this.jobCompany,
    jobCompanyDescription: this.jobCompanyDescription,
    jobCompanySite: this.jobCompanySite,
    jobCandidates: this.jobCandidates,
    createdAt: this.createdAt,
    user: userData.getInfos()
  };
};
// module.exports = Job = mongoose.model("gmc-jobs", jobSchema);
module.exports = Job = mongoose.model("gmcjobs", jobSchema);
