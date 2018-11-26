import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  getUserAds,
  getUserJobs,
  getUserNews
} from "../../actions/usersAction";
import ReturnButton from "../layout/ReturnButton";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      ads: {},
      jobs: {},
      news: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    const { user } = nextProps.auth;
    const { userAds, userJobs, userNews } = nextProps.users;
    if (user) this.setState({ user });
    if (userAds) this.setState({ ads: userAds.data });
    if (userJobs) this.setState({ jobs: userJobs.data });
    if (userNews) this.setState({ news: userNews.data });
  }

  componentDidMount() {
    this.props.getUserAds(this.props.match.params.id, this.props.history);
    this.props.getUserNews(this.props.match.params.id, this.props.history);
    this.props.getUserJobs(this.props.match.params.id, this.props.history);
  }
  render() {
    const { ads, jobs, news } = this.state;
    const goAd = "Voir l'annonce";
    const goJob = "Voir l'offre d'emploi";
    const goNews = "Voir la news";
    const updateMessage = "Modifier";
    let allUserAds;
    let allUserJobs;
    let allUserNews;
    if (ads && ads.data && ads.data.length > 0) {
      allUserAds = ads.data.map((ad, index) => (
        <div key={index}>
          <div>
            <h4>{ad.title}</h4>
            <p>{ad.description}</p>
            <small>{ad.category}</small>
            <Link to={`/annonce/${ad._id}`}>
              <button>{goAd}</button>
            </Link>
            <Link to={`/annonce/edit/${ad._id}`}>
              <button>{updateMessage}</button>
            </Link>
          </div>
        </div>
      ));
    }
    if (jobs && jobs.data && jobs.data.length > 0) {
      allUserJobs = jobs.data.map((job, index) => (
        <div key={index}>
          <div>
            <h4>{job.jobTitle}</h4>
            <p>{job.jobDescription}</p>
            <small>{job.jobCompany}</small>
            <Link to={`/job/${job._id}`}>
              <button>{goJob}</button>
            </Link>
            <Link to={`/job/edit/${job._id}`}>
              <button>{updateMessage}</button>
            </Link>
          </div>
        </div>
      ));
    }

    if (news && news.data && news.data.length > 0) {
      allUserNews = news.data.map((aNews, index) => (
        <div key={index}>
          <div>
            <h4>{aNews.title}</h4>
            <p>{aNews.description}</p>
            <small>{aNews.name}</small>
            <Link to={`/news/${aNews._id}`}>
              <button>{goNews}</button>
            </Link>
            <Link to={`/news/edit/${aNews._id}`}>
              <button>{updateMessage}</button>
            </Link>
          </div>
        </div>
      ));
    }

    return (
      <div>
        <ReturnButton history={this.props.history} />
        <h1>Profile</h1>
        <hr />
        <h3>Annonces</h3>
        {allUserAds}
        <hr />
        <h3>Jobs</h3>
        {allUserJobs}
        <hr />
        <h3>News</h3>
        {allUserNews}
      </div>
    );
  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users
});
export default connect(
  mapStateToProps,
  { getUserAds, getUserJobs, getUserNews }
)(withRouter(Profile));
