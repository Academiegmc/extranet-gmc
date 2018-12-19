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
      ads: {},
      jobs: {},
      news: {},
      errors: {}
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
        <div className="card flex-column" key={index}>
          <div className="card-body">
            <Link to={`/annonce/${ad._id}`}>
              <h4 className="card-title">{ad.title}</h4>
            </Link>
            <small className="card-subtitle">{ad.category}</small>
            <div className="card-btn flex-row">
              <button
                className="btn-danger"
                onClick={() => {
                  deleteAd(ad._id);
                  this.props.getUserAds(
                    this.props.match.params.id,
                    this.props.history
                  );
                }}
              >
                Supprimer
              </button>
              <Link to={`/annonce/edit/${ad._id}`}>
                <button className="btn-success">{updateMessage}</button>
              </Link>
            </div>
          </div>
        </div>
      ));
    }
    if (jobs && jobs.data && jobs.data.length > 0) {
      allUserJobs = jobs.data.map((job, index) => (
        <div className="card flex-column" key={index}>
          <div className="card-body">
            <Link to={`/job/${job._id}`}>
              <h4 className="card-title">{job.jobTitle}</h4>
            </Link>
            <small className="card-subtitle">{job.jobCompany}</small>
            <div className="card-btn flex-row">
              <button
                className="btn-danger"
                onClick={() => {
                  deleteJob(job._id);
                  this.props.getUserJobs(
                    this.props.match.params.id,
                    this.props.history
                  );
                }}
              >
                Supprimer
              </button>
              <Link to={`/job/edit/${job._id}`}>
                <button className="btn-success">{updateMessage}</button>
              </Link>
            </div>
          </div>
        </div>
      ));
    }

    if (news && news.data && news.data.length > 0) {
      allUserNews = news.data.map((aNews, index) => (
        <div className="card flex-column" key={index}>
          <div className="card-body">
            <Link to={`/news/${aNews._id}`}>
              <h4 className="card-title">{aNews.title}</h4>
            </Link>
            <small className="card-subtitle">{aNews.name}</small>
            <div className="card-btn flex-row">
              <button
                className="btn-danger"
                onClick={() => {
                  deleteNews(aNews._id);
                  this.props.getUserNews(
                    this.props.match.params.id,
                    this.props.history
                  );
                }}
              >
                Supprimer
              </button>
              <Link to={`/news/edit/${aNews._id}`}>
                <button className="btn-success">{updateMessage}</button>
              </Link>
            </div>
          </div>
        </div>
      ));
    }

    return (
      <div className="profile-container">
        {sessionAlert}
        <ReturnButton history={this.props.history} />
        <h1>Mon profil</h1>
        <hr />
        <div className="flex-row flex-wrap">
          <h3>Annonces</h3>
          {allUserAds}
        </div>
        <hr />
        <div className="flex-row flex-wrap">
          <h3>Jobs</h3>
          {allUserJobs}
        </div>
        <hr />
        <div className="flex-row flex-wrap">
          <h3>News</h3>
          {allUserNews}
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
  { getUserAds, getUserJobs, getUserNews, logout }
)(Profile);
