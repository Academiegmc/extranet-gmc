import React, { Component } from "react";
import Moment from "moment";
import ReturnButton from "../layout/ReturnButton";
import { connect } from "react-redux";
import { getAJob, updateJob, createJob } from "../../actions/jobActions";
class AddJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobTitle: "",
      jobDescription: "",
      jobContractType: "Stage",
      jobType: "Temps plein",
      jobRemuneration: "Tarif conventionnel",
      jobStartDate: "",
      jobSkills: "",
      jobCity: "",
      jobCountry: "France",
      jobCompany: "",
      jobCompanyDescription: "",
      jobCompanySite: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { isLoaded, job } = nextProps.jobs;
    if (isLoaded && job)
      this.setState({
        jobTitle: job.data.jobTitle,
        jobDescription: job.data.jobDescription,
        jobContractType: job.data.jobContractType,
        jobType: job.data.jobType,
        jobRemuneration: job.data.jobRemuneration,
        jobStartDate: job.data.jobStartDate,
        jobSkills: job.data.jobSkills,
        jobCity: job.data.jobCity,
        jobCountry: job.data.jobCountry,
        jobCompany: job.data.jobCompany,
        jobCompanyDescription: job.data.jobCompanyDescription,
        jobCompanySite: job.data.jobCompanySite
      });
  }

  componentDidMount() {
    if (this.props.match.path === "/job/edit/:id") {
      this.props.getAJob(this.props.match.params.id);
    }
  }
  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.props.match.path === "/job/edit/:id") {
      updateJob(this.props.match.params.id, this.state, this.props.history);
    }
    if (this.props.match.path === "/admin/job") {
      this.props.createJob(this.state, this.props.history);
    }
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
        <ReturnButton history={this.props.history} />
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
              value={jobTitle}
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
              value={jobDescription}
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
              value={jobContractType}
            >
              <option value="stage">Stage</option>
              <option value="cdi">CDI</option>
              <option value="cdd">CDD</option>
              <option value="ca">Contrat d'apprentissage</option>
              <option value="cp">Contrat de professionnalisation</option>
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
              value={jobType}
            >
              <option value="temps-plein">Temps plein</option>
              <option value="temps-partiel">Temps partiel</option>
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
              value={jobRemuneration}
            >
              <option value="tarif-conventionnel">Tarif conventionnel</option>
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
              value={Moment(jobStartDate).format("YYYY-MM-DD")}
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
              value={jobSkills}
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
              value={jobCity}
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
              value={jobCountry}
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
              value={jobCompany}
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
              value={jobCompanyDescription}
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
              value={jobCompanySite}
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
  { getAJob, createJob }
)(AddJob);
