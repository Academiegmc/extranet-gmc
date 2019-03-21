import React, { Component, PureComponent } from "react";
import Moment from "moment";
import ReturnButton from "../layout/ReturnButton";
import { connect } from "react-redux";
import { getAJob, updateJob, createJob } from "../../actions/jobActions";
class AddJob extends PureComponent {
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
      jobCompanySite: "",
      isLoaded: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.dissmissAlert = this.dissmissAlert.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      Object.keys(this.props.jobs.job).length > 0 &&
      this.props.jobs.job.constructor === Object &&
      !Object.is(this.props.jobs.job, prevProps.jobs.job)
    ) {
      this.setState({
        jobTitle: this.props.jobs.job.jobTitle,
        jobDescription: this.props.jobs.job.jobDescription,
        jobContractType: this.props.jobs.job.jobContractType,
        jobType: this.props.jobs.job.jobType,
        jobRemuneration: this.props.jobs.job.jobRemuneration,
        jobStartDate: this.props.jobs.job.jobStartDate,
        jobSkills: this.props.jobs.job.jobSkills,
        jobCity: this.props.jobs.job.jobCity,
        jobCountry: this.props.jobs.job.jobCountry,
        jobCompany: this.props.jobs.job.jobCompany,
        jobCompanyDescription: this.props.jobs.job.jobCompanyDescription,
        jobCompanySite: this.props.jobs.job.jobCompanySite,
        isLoaded: this.props.jobs.isLoaded
      });
    }
  }

  componentDidMount() {
    if (this.props.match.path === "/job/edit/:id") {
      this.props.getAJob(this.props.match.params.id);
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    // console.log(e.target.name, e.target.value);
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.props.match.path === "/job/edit/:id") {
      this.props.updateJob(
        this.props.match.params.id,
        this.state,
        this.props.history
      );
    }
    if (this.props.match.path === "/admin/job") {
      this.props.createJob(this.state, this.props.history);
    }
  };
  dissmissAlert = () => {
    this.setState({ isLoaded: false });
  };
  render() {
    let alert;
    if (this.state.isLoaded) {
      alert = (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>Job modifié !</strong>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={this.dissmissAlert}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    }
    return (
      <div className="container bg-white rounded mt-3">
        {alert}
        <ReturnButton history={this.props.history} />
        <form className="flex-column flex-center" onSubmit={this.onSubmit}>
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
              value={this.state.jobTitle}
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
              value={this.state.jobDescription}
            />
          </div>

          <div className="form-row">
            <div className="col form-group">
              <label htmlFor="jobContractType">Type de contrat</label>
              <select
                type="text"
                className="form-control"
                id="jobContractType"
                name="jobContractType"
                aria-describedby="jobContractTypeHelp"
                placeholder="Type de contrat"
                onChange={this.onChange}
                value={this.state.jobContractType}
              >
                <option value="stage">Stage</option>
                <option value="cdi">CDI</option>
                <option value="cdd">CDD</option>
                <option value="ca">Contrat d'apprentissage</option>
                <option value="cp">Contrat de professionnalisation</option>
              </select>
            </div>

            <div className="col form-group">
              <label htmlFor="jobType">Durée de travail</label>
              <select
                type="text"
                className="form-control"
                id="jobType"
                name="jobType"
                aria-describedby="jobTypeHelp"
                placeholder="Durée de travail"
                onChange={this.onChange}
                value={this.state.jobType}
              >
                <option value="temps-plein">Temps plein</option>
                <option value="temps-partiel">Temps partiel</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="col form-group">
              <label htmlFor="jobRemuneration">Rémunération</label>
              <select
                className="form-control"
                id="jobRemuneration"
                name="jobRemuneration"
                aria-describedby="jobRemunerationHelp"
                placeholder="Rémunération"
                onChange={this.onChange}
                value={this.state.jobRemuneration}
              >
                <option value="tarif-conventionnel">Tarif conventionnel</option>
              </select>
            </div>

            <div className="col form-group">
              <label htmlFor="jobStartDate">Date de départ</label>
              <input
                type="date"
                className="form-control"
                id="jobStartDate"
                name="jobStartDate"
                aria-describedby="jobStartDateHelp"
                placeholder="Date de départ"
                onChange={this.onChange}
                value={Moment(this.state.jobStartDate).format("YYYY-MM-DD")}
              />
            </div>
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
              value={this.state.jobSkills}
            />
          </div>

          <hr />
          <h5>Localisation</h5>
          <div className="form-row">
            <div className="col form-group">
              <label htmlFor="jobCity">Ville</label>
              <input
                type="text"
                className="form-control"
                id="jobCity"
                name="jobCity"
                aria-describedby="jobCityHelp"
                placeholder="Ville"
                onChange={this.onChange}
                value={this.state.jobCity}
              />
            </div>

            <div className="col form-group">
              <label htmlFor="jobCountry">Pays</label>
              <select
                className="form-control"
                id="jobCountry"
                name="jobCountry"
                aria-describedby="jobCountryHelp"
                placeholder="Pays"
                onChange={this.onChange}
                value={this.state.jobCountry}
              >
                <option>France</option>
              </select>
            </div>
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
              value={this.state.jobCompany}
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
              value={this.state.jobCompanyDescription}
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
              value={this.state.jobCompanySite}
            />
          </div>
          <button type="submit" className="btn btn-primary">
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
  { getAJob, createJob, updateJob }
)(AddJob);
