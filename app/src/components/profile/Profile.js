import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReturnButton from "../layout/ReturnButton";
import { logout } from "../../actions/authActions";
import { deleteNews, getAllUserNews } from "../../actions/newsActions";
import { deleteJob, getAllUserJobs } from "../../actions/jobActions";
import { deleteAd, getAllUserAd } from "../../actions/adAction";

class Profile extends PureComponent {
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
  // componentWillReceiveProps(nextProps) {
  //   const { user } = nextProps.auth;
  //   const { userAds, userJobs, userNews } = nextProps.users;
  //   if (user) this.setState({ user });
  //   if (userAds) this.setState({ ads: userAds.data });
  //   if (userJobs) this.setState({ jobs: userJobs.data });
  //   if (userNews) this.setState({ news: userNews.data });
  //   if (nextProps.errors) this.setState({ errors: nextProps.errors });
  // }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.ads.ads) this.setState({ ads: this.props.ads.ads });
    if (this.props.jobs.jobs) this.setState({ jobs: this.props.jobs.jobs });
    if (this.props.news.newsTab)
      this.setState({ news: this.props.news.newsTab });
  }

  componentDidMount() {
    this.props.getAllUserAd(this.props.auth.user.id);
    this.props.getAllUserJobs(this.props.auth.user.id);
    this.props.getAllUserNews(this.props.auth.user.id);
  }
  logoutUser = () => {
    //Rediriger l'utilisateur vers la page de login après quelques secondes en l'avertissant au préalable
    this.props.logout();
    this.props.history.push("/");
  };
  render() {
    const { ads, jobs, news } = this.state;
    const updateMessage = "Modifier";
    let allUserAds;
    let allUserJobs;
    let allUserNews;
    let sessionAlert;
    if (ads.length > 0) {
      allUserAds = ads.map((ad, index) => (
        <div className="card ml-3 mb-3" style={{ width: "18rem" }} key={index}>
          <div className="card-body">
            <Link to={`/annonce/${ad.id}`}>
              <h5 className="card-title">{ad.title}</h5>
            </Link>
            <div className="flex-row">
              <button
                className="btn"
                style={{ backgroundColor: "#9F1540", color: "white" }}
                onClick={() => {
                  this.props.deleteAd(ad.id);
                }}
              >
                Supprimer
              </button>
              <Link to={`/annonce/edit/${ad.id}`}>
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
    if (jobs.length > 0) {
      allUserJobs = jobs.map((job, index) => (
        <div className="card ml-3 mb-3" style={{ width: "18rem" }} key={index}>
          <div className="card-body">
            <Link to={`/job/${job.id}`}>
              <h5 className="card-title">{job.jobTitle}</h5>
            </Link>
            <div className="flex-row">
              <button
                className="btn"
                style={{ backgroundColor: "#9F1540", color: "white" }}
                onClick={() => this.props.deleteJob(job.id)}
              >
                Supprimer
              </button>
              <Link to={`/job/edit/${job.id}`}>
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

    if (news.length > 0) {
      allUserNews = news.map((aNews, index) => (
        <div className="card ml-3 mb-3" style={{ width: "18rem" }} key={index}>
          <div className="card-body">
            <Link to={`/news/${aNews.id}`}>
              <h5 className="card-title">{aNews.title}</h5>
            </Link>
            <div className=" flex-row">
              <button
                className="btn"
                style={{ backgroundColor: "#9F1540", color: "white" }}
                onClick={() => {
                  this.props.deleteNews(aNews.id);
                }}
              >
                Supprimer
              </button>
              <Link to={`/news/edit/${aNews.id}`}>
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
      <div className="container-fluid">
        {sessionAlert}
        <div className="flex-column flex-md-row">
          <ReturnButton history={this.props.history} />
          <Link
            className="btn btn-link"
            to={`/profile/edit/${this.props.match.params.id}`}
          >
            <h2>Mon profil</h2>
          </Link>
          <Link className="btn btn-link" to="/markdown">
            <h2>Documentation</h2>
          </Link>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-md-center">
          <a className="btn btn-outline-primary ml-3 mb-3" href="/admin/job">
            <h3>Ajouter un job</h3>
          </a>
          <a
            className="btn btn-outline-primary ml-3 mb-3"
            href="/admin/annonce"
          >
            <h3>Ajouter une annonce</h3>
          </a>
          <a className="btn btn-outline-primary ml-3 mb-3" href="/admin/news">
            <h3>Ajouter une news</h3>
          </a>
        </div>
        <div className="d-flex flex-column">
          <h3
            className="text-left border border-dark mt-5 mb-3  p-4"
            style={{ fontFamily: "Lato", color: "#646363" }}
          >
            Annonces
          </h3>{" "}
          <div className="d-flex flex-row flex-wrap">{allUserAds}</div>
          <h3
            className="text-left border border-dark mt-5 mb-3  p-4"
            style={{ fontFamily: "Lato", color: "#646363" }}
          >
            Jobs
          </h3>{" "}
          <div className="d-flex flex-row flex-wrap">{allUserJobs}</div>
          <h3
            className="text-left border border-dark mt-5 mb-3 p-4"
            style={{ fontFamily: "Lato", color: "#646363" }}
          >
            News
          </h3>{" "}
          <div className="d-flex flex-row flex-wrap">{allUserNews}</div>
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
  ads: state.ads,
  jobs: state.jobs,
  news: state.news,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  {
    logout,
    deleteNews,
    deleteAd,
    deleteJob,
    getAllUserAd,
    getAllUserJobs,
    getAllUserNews
  }
)(Profile);
