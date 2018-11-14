const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  jobContractType: { type: String, required: true },
  jobType: { type: String, required: true },
  jobRemuneration: { type: String, required: true },
  jobStartDate: { type: Date, required: true, default: Date.now },
  jobSkills: [],
  jobCity: { type: String, required: true },
  jobCountry: { type: String, required: true },
  jobCompany: { type: String, required: true },
  jobCompanyDescription: { type: String, required: true },
  jobCompanySite: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now }
});
module.exports = Job = mongoose.model("gmc-jobs", jobSchema);
