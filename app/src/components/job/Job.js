import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import bsCustomFileInput from "bs-custom-file-input";
import { getAJob } from "../../actions/jobActions";
import Axios from "axios";
import ReturnButton from "../layout/ReturnButton";
import { logout } from "../../actions/authActions";
class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lm: "",
      cv: null,
      isSent: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.jobs.job.data);
  }
  componentDidMount() {
    this.props.getAJob(this.props.match.params.id);
    bsCustomFileInput.init();
  }
  onChange = e => {
    if (e.target.name === "cv") this.setState({ cv: e.target.files[0] });
    else this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { cv, lm, jobTitle, jobCompany } = this.state;
    this.fileUpload(cv, lm, jobTitle, jobCompany);
  };
  fileUpload = (file, lm, poste, agence) => {
    const url = "/api/jobs/application";
    const formData = new FormData();
    formData.append("agence", agence);
    formData.append("poste", poste);
    formData.append("lm", lm);
    formData.append("cv", file);
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    Axios.post(url, formData, config)
      .then(res => {
        this.setState({ isSent: true });
      })
      .catch(err => {
        if (err.response.status === 403) {
          //Rediriger l'utilisateur vers la page de login après quelques secondes en l'avertissant au préalable
          logout();
          this.props.history.push("/");
        }
      });
  };
  render() {
    const {
      jobCompany,
      jobContractType,
      jobType,
      jobTitle,
      jobCity,
      jobCountry,
      jobCompanySite,
      jobRemuneration,
      jobStartDate,
      jobDescription,
      jobCompanyDescription,
      jobSkills,
      createdAt
    } = this.state;
    let skills;
    const publishedDate = (
      <Moment fromNow ago locale="fr">
        {createdAt}
      </Moment>
    );
    if (jobSkills && jobSkills.length > 0) {
      skills = jobSkills.map((skill, index) => (
        <h5 style={{ display: "inline-block", margin: 2 }} key={index}>
          <span className="badge badge-secondary">{skill}</span>
        </h5>
      ));
    }
    const startDate = <Moment format="DD-MM-YYYY">{jobStartDate}</Moment>;
    return (
      <div className="container mt-5 card rounded">
        <ReturnButton history={this.props.history} />
        <div className="d-flex flex-column align-items-center w-100">
          <h3>{jobTitle}</h3>
          <h4>{jobCompany}</h4>
        </div>
        {/* Job infos */}
        <div className="d-flex flex-wrap">
          <div className="col-lg-4 col-md-4 col-xs-12">
            <p>
              {jobCity}, {jobCountry}
            </p>
            <p>{jobCompanySite}</p>
          </div>
          <div className="col-lg-4 col-md-4 col-xs-12">
            <p>{jobType}</p>
            <p>Rémunération: {jobRemuneration}</p>
          </div>
          <div className="col-lg-4 col-md-4 col-xs-12">
            <p>Date souhaité : {startDate} </p>
            <p> </p>
          </div>
        </div>

        <div className="d-inline-flex justify-content-between align-items-center text-white bg-dark w-100 p-2">
          <span className="font-weight-bold">
            {jobContractType !== undefined ? jobContractType.toUpperCase() : ""}
          </span>
          <span className="font-weight-bold">
            Publié il y a {publishedDate}
          </span>
        </div>

        <div className="row mt-5">
          {/* Offer */}
          <div className="col-6">
            <h4>Description de l'offre</h4>
            <div className="text-justify">
              <p>{jobDescription}</p>
            </div>
          </div>
          {/* jobCompany */}
          <div className="col-6">
            <h4>Description de l'entreprise</h4>
            <div className="text-justify">
              <p>{jobCompanyDescription}</p>
            </div>
          </div>
          {/* jobSkills */}
          <div className="col-6">
            <h4>Compétences clés</h4>
            <div className="text">{skills}</div>
          </div>
        </div>

        <div
          className="mt-3"
          style={{
            display: "flex",
            flexFlow: "column nowrap",
            justifyContent: "center",
            width: "100%"
          }}
        >
          <div>
            <h4>Envoyer votre candidature</h4>
          </div>
          <form encType="multipart/form-data" onSubmit={this.onSubmit}>
            {/* Lettre de Motivation */}
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-pencil-alt" />
                </span>
              </div>
              <textarea
                className="form-control"
                placeholder="Motivation*"
                name="lm"
                onChange={this.onChange}
                required
              />
            </div>
            {/* CV */}
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupFileAddon01">
                  <i className="fas fa-upload" />
                </span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="cv"
                  name="cv"
                  required
                  aria-describedby="inputGroupFileAddon01"
                  onChange={this.onChange}
                />
                <label
                  htmlFor="cv"
                  className="custom-file-label"
                  data-browse="Parcourir"
                >
                  Choisir un fichier
                </label>
              </div>
            </div>
            <p>
              <small>
                Type de fichier autorisé: .pdf Taille maximum : 2Mo.
              </small>
            </p>
            <div className="form-group">
              <button className="btn btn-primary" style={{ width: "100%" }}>
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Job.propTypes = {
  getAJob: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  jobs: state.jobs
});
export default connect(
  mapStateToProps,
  { getAJob }
)(Job);
