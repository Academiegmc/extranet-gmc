import React, { Component } from "react";
import ReturnButton from "../layout/ReturnButton";
import { urls } from "../../utils";
import { connect } from "react-redux";
import { getAJob, updateJob } from "../../actions/jobActions";
class AddJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job: {},
      jobTitle: "",
      jobDescription: "",
      jobContractType: "",
      jobType: "",
      jobRemuneration: "",
      jobStartDate: "",
      jobSkills: [],
      jobCity: "",
      jobCountry: "",
      jobCompany: "",
      jobCompanyDescription: "",
      jobCompanySite: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { isLoaded, job } = nextProps.jobs;
    if (isLoaded && job) this.setState({ job: job.data });
  }

  componentDidMount() {
    if (this.props.match.path === "/job/edit/:id") {
      this.props.getAJob(this.props.match.params.id);
    }
    if (this.props.match.path === "/admin/job") {
      // this.props.getAJob(this.props.match.params.id);
    }
  }
  onChange = e => {
    const { name, value } = e.target;
    console.log(name, value);
    this.setState({ [name]: value });
  };
  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    const {
      jobTitle,
      jobDescription,
      jobContractType,
      jobType,
      jobRemuneration,
      jobStartDate,
      jobSkills,
      jobCity,
      jobCountry,
      jobCompany,
      jobCompanyDescription,
      jobCompanySite
    } = this.state;
    const jobUpdated = {
      jobTitle,
      jobDescription,
      jobContractType,
      jobType,
      jobRemuneration,
      jobStartDate,
      jobSkills,
      jobCity,
      jobCountry,
      jobCompany,
      jobCompanyDescription,
      jobCompanySite
    };
    updateJob(this.props.match.params.id, jobUpdated);
  };

  render() {
    let {
      jobTitle,
      jobDescription,
      jobContractType,
      jobType,
      jobRemuneration,
      jobStartDate,
      jobSkills,
      jobCity,
      jobCountry,
      jobCompany,
      jobCompanyDescription,
      jobCompanySite
    } = this.state;
    return (
      <div className="container">
        <ReturnButton url={urls.admin} />
        <form onSubmit={this.onSubmit}>
          <h5>Poste</h5>
          <div className="form-group">
            <label htmlFor="jobTitle">Titre</label>
            <input
              type="text"
              className="form-control"
              id="jobTitle"
              name="jobTitle"
              aria-describedby="jobTitleHelp"
              placeholder="Intitulé du poste"
              onChange={this.onChange}
              value={
                jobTitle !== "" && this.state.job.jobTitle
                  ? jobTitle
                  : this.state.job.jobTitle
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="jobDescription">Description du poste</label>
            <textarea
              type="text"
              className="form-control"
              id="jobDescription"
              name="jobDescription"
              aria-describedby="jobDescriptionHelp"
              placeholder="Description du poste"
              onChange={this.onChange}
              value={
                jobDescription !== "" && this.state.job.jobDescription
                  ? jobDescription
                  : this.state.job.jobDescription
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="jobContractType">Type de contrat</label>
            <select
              type="text"
              className="form-control"
              id="jobContractType"
              name="jobContractType"
              aria-describedby="jobContractTypeHelp"
              placeholder="Type de contrat"
              onChange={this.onChange}
              value={
                jobContractType !== "" && this.state.job.jobContractType
                  ? jobContractType
                  : this.state.job.jobContractType
              }
            >
              <option>Stage</option>
              <option>CDI</option>
              <option>CDD</option>
              <option>Contrat d'apprentissage</option>
              <option>Contrat de professionnalisation</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="jobType">Durée de travail</label>
            <select
              type="text"
              className="form-control"
              id="jobType"
              name="jobType"
              aria-describedby="jobTypeHelp"
              placeholder="Durée de travail"
              onChange={this.onChange}
              value={
                jobType !== "" && this.state.job.jobType
                  ? jobType
                  : this.state.job.jobType
              }
            >
              <option>Temps plein</option>
              <option>Temps partiel</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="jobRemuneration">Rémunération</label>
            <select
              type="text"
              className="form-control"
              id="jobRemuneration"
              name="jobRemuneration"
              aria-describedby="jobRemunerationHelp"
              placeholder="Rémunération"
              onChange={this.onChange}
              value={
                jobRemuneration !== "" && this.state.job.jobRemuneration
                  ? jobRemuneration
                  : this.state.job.jobRemuneration
              }
            >
              <option>Tarif conventionnel</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="jobStartDate">Date de départ</label>
            <input
              type="date"
              className="form-control"
              id="jobStartDate"
              name="jobStartDate"
              aria-describedby="jobStartDateHelp"
              placeholder="Date de départ"
              onChange={this.onChange}
              value={
                jobStartDate !== "" && this.state.job.jobStartDate
                  ? jobStartDate
                  : this.state.job.jobStartDate
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="jobSkills">Compétences clés</label>
            <input
              type="text"
              className="form-control"
              id="jobSkills"
              name="jobSkills"
              aria-describedby="jobSkillsHelp"
              placeholder="Compétences clés"
              onChange={this.onChange}
              value={
                jobSkills !== "" && this.state.job.jobSkills
                  ? jobSkills
                  : this.state.job.jobSkills
              }
            />
          </div>

          <hr />
          <h5>Localisation</h5>
          <div className="form-group">
            <label htmlFor="jobCity">Ville</label>
            <input
              type="text"
              className="form-control"
              id="jobCity"
              name="jobCity"
              aria-describedby="jobCityHelp"
              placeholder="Ville"
              onChange={this.onChange}
              value={
                jobCity !== "" && this.state.job.jobCity
                  ? jobCity
                  : this.state.job.jobCity
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="jobCountry">Pays</label>
            <select
              type="text"
              className="form-control"
              id="jobCountry"
              name="jobCountry"
              aria-describedby="jobCountryHelp"
              placeholder="Pays"
              onChange={this.onChange}
              value={
                jobCountry !== "" && this.state.job.jobCountry
                  ? jobCountry
                  : this.state.job.jobCountry
              }
            >
              <option>France</option>
            </select>
          </div>
          <hr />
          <h5>Entreprise</h5>
          <div className="form-group">
            <label htmlFor="jobCompany">Nom de l'entreprise</label>
            <input
              type="text"
              className="form-control"
              id="jobCompany"
              name="jobCompany"
              aria-describedby="jobCompanyHelp"
              placeholder="Nom de l'entreprise"
              onChange={this.onChange}
              value={
                jobCompany != "" && this.state.job.jobCompany
                  ? jobCompany
                  : this.state.job.jobCompany
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="jobCompanyDescription">
              Description de l'entreprise
            </label>
            <textarea
              type="text"
              className="form-control"
              id="jobCompanyDescription"
              name="jobCompanyDescription"
              aria-describedby="jobCompanyDescriptionHelp"
              placeholder="Description de l'entreprise"
              onChange={this.onChange}
              value={
                jobCompanyDescription != "" &&
                this.state.job.jobCompanyDescription
                  ? jobCompanyDescription
                  : this.state.job.jobCompanyDescription
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="jobCompanySite">Site de l'entreprise</label>
            <input
              type="text"
              className="form-control"
              id="jobCompanySite"
              name="jobCompanySite"
              aria-describedby="jobCompanySiteHelp"
              placeholder="Site de l'entreprise"
              onChange={this.onChange}
              value={
                jobCompanySite != "" && this.state.job.jobCompanySite
                  ? jobCompanySite
                  : this.state.job.jobCompanySite
              }
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%" }}
          >
            Envoyer
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToprops = state => ({
  jobs: state.jobs
});
export default connect(
  mapStateToprops,
  { getAJob }
)(AddJob);
