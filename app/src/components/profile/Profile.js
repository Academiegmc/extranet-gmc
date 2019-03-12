import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getUserAds,
  getUserJobs,
  getUserNews
} from "../../actions/usersAction";
import ReturnButton from "../layout/ReturnButton";
import { logout } from "../../actions/authActions";
import { deleteNews } from "../../actions/newsActions";
import { deleteJob } from "../../actions/jobActions";
import { deleteAd } from "../../actions/adAction";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      ads: [],
      jobs: [],
      news: [],
      errors: []
    };
    this.logoutUser = this.logoutUser.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { user } = nextProps.auth;
    const { userAds, userJobs, userNews } = nextProps.users;
    if (user) this.setState({ user });
    if (userAds) this.setState({ ads: userAds.data });
    if (userJobs) this.setState({ jobs: userJobs.data });
    if (userNews) this.setState({ news: userNews.data });
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
  }

  componentDidMount() {
    this.props.getUserAds(this.props.match.params.id, this.props.history);
    this.props.getUserNews(this.props.match.params.id, this.props.history);
    this.props.getUserJobs(this.props.match.params.id, this.props.history);
  }
  logoutUser = () => {
    //Rediriger l'utilisateur vers la page de login après quelques secondes en l'avertissant au préalable
    this.props.logout();
    this.props.history.push("/");
  };
  render() {
    const { ads, jobs, news, errors } = this.state;
    const updateMessage = "Modifier";
    let allUserAds;
    let allUserJobs;
    let allUserNews;
    let sessionAlert;
    if (errors.status === 403) this.logoutUser();
    if (ads && ads.data && ads.data.length > 0) {
      allUserAds = ads.data.map((ad, index) => (
        <div className="card ml-3 mb-3" style={{ width: "18rem" }} key={index}>
          <div className="card-body">
            <Link to={`/annonce/${ad._id}`}>
              <h5 className="card-title">{ad.title}</h5>
            </Link>
            <div className="flex-row">
              <button
                className="btn"
                style={{ backgroundColor: "#9F1540", color: "white" }}
                onClick={() => {
                  deleteAd(ad._id);
                  this.props.getUserAds(
                    this.props.match.params._id,
                    this.props.history
                  );
                }}
              >
                Supprimer
              </button>
              <Link to={`/annonce/edit/${ad._id}`}>
                <button
                  className="btn"
                  style={{ backgroundColor: "#539356", color: "white" }}
                >
                  {updateMessage}
                </button>
              </Link>
            </div>
            <small className="card-subtitle">{ad.category}</small>
          </div>
        </div>
      ));
    }
    if (jobs && jobs.data && jobs.data.length > 0) {
      console.log(jobs);
      allUserJobs = jobs.data.map((job, index) => (
        <div className="card ml-3 mb-3" style={{ width: "18rem" }} key={index}>
          <div className="card-body">
            <Link to={`/job/${job._id}`}>
              <h5 className="card-title">{job.jobTitle}</h5>
            </Link>
            <div className="flex-row">
              <button
                className="btn"
                style={{ backgroundColor: "#9F1540", color: "white" }}
                onClick={() => {
                  deleteJob(job._id);
                  this.props.getUserJobs(
                    this.props.match.params._id,
                    this.props.history
                  );
                }}
              >
                Supprimer
              </button>
              <Link to={`/job/edit/${job._id}`}>
                <button
                  className="btn"
                  style={{ backgroundColor: "#539356", color: "white" }}
                >
                  {updateMessage}
                </button>
              </Link>
            </div>
            <small className="card-subtitle">{job.jobCompany}</small>
          </div>
        </div>
      ));
    }

    if (news && news.data && news.data.length > 0) {
      allUserNews = news.data.map((aNews, index) => (
        <div className="card ml-3 mb-3" style={{ width: "18rem" }} key={index}>
          <div className="card-body">
            <Link to={`/news/${aNews._id}`}>
              <h5 className="card-title">{aNews.title}</h5>
            </Link>
            <div className=" flex-row">
              <button
                className="btn"
                style={{ backgroundColor: "#9F1540", color: "white" }}
                onClick={() => {
                  console.log(aNews);
                  deleteNews(aNews._id);
                  this.props.getUserNews(
                    this.props.match.params._id,
                    this.props.history
                  );
                }}
              >
                Supprimer
              </button>
              <Link to={`/news/edit/${aNews._id}`}>
                <button
                  className="btn"
                  style={{ backgroundColor: "#539356", color: "white" }}
                >
                  {updateMessage}
                </button>
              </Link>
            </div>
            <small className="card-subtitle">{aNews.name}</small>
          </div>
        </div>
      ));
    }

    return (
      <div className="">
        {sessionAlert}
        <ReturnButton history={this.props.history} />
        <Link
          className="btn btn-link"
          to={`/profile/edit/${this.props.match.params._id}`}
        >
          <h1>Mon profil</h1>
        </Link>
        <div className="d-flex flex-sm-column flex-md-row justify-content-md-center">
          <a className="btn btn-outline-primary ml-3" href="/admin/job">
            <h3>Ajouter un job</h3>
          </a>
          <a className="btn btn-outline-primary ml-3" href="/admin/annonce">
            <h3>Ajouter une annonce</h3>
          </a>
          <a className="btn btn-outline-primary ml-3" href="/admin/news">
            <h3>Ajouter une news</h3>
          </a>
        </div>
        <div className="d-sm-flex flex-column">
          <h3
            className="text-left border border-dark mt-5 mb-3  p-4"
            style={{ fontFamily: "Lato", color: "#646363" }}
          >
            Annonces
          </h3>{" "}
          <div className="d-sm-flex flex-row flex-wrap">{allUserAds}</div>
          <h3
            className="text-left border border-dark mt-5 mb-3  p-4"
            style={{ fontFamily: "Lato", color: "#646363" }}
          >
            Jobs
          </h3>{" "}
          <div className="d-sm-flex flex-row flex-wrap">{allUserJobs}</div>
          <h3
            className="text-left border border-dark mt-5 mb-3 p-4"
            style={{ fontFamily: "Lato", color: "#646363" }}
          >
            News
          </h3>{" "}
          <div className="d-sm-flex flex-row flex-wrap">{allUserNews}</div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getUserAds, getUserJobs, getUserNews, logout, deleteNews }
)(Profile);
