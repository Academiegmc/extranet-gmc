import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllAds, deleteAd } from "../../actions/adAction";
import { getAllJobs, deleteJob } from "../../actions/jobActions";
import { getAllNews, deleteNews } from "../../actions/newsActions";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      ads: [],
      news: []
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.jobs.jobs.data) {
      this.setState({ jobs: nextProps.jobs.jobs.data });
    }
    if (nextProps.ads.ads.data) {
      this.setState({ ads: nextProps.ads.ads.data });
    }
    if (nextProps.news.newsTab.data) {
      this.setState({ news: nextProps.news.newsTab.data });
    }
  }
  componentDidMount = () => {
    this.props.getAllJobs();
    this.props.getAllAds();
    this.props.getAllNews();
  };
  render() {
    const { jobs, ads, news } = this.state;
    // console.log(this.state);
    const allJobs = jobs.map((job, index) => (
      <div key={index}>
        <h6>{job.jobTitle}</h6>
        {/* <button onClick={this.props.deleteJob(job._id)}>Supprimer</button> */}
      </div>
    ));
    return (
      <div>
        <h1>Admin dashboard</h1>
        <Link to="job">
          <h3>Ajouter un job</h3>
        </Link>
        <Link to="ads">
          <h3>Ajouter une annonce</h3>
        </Link>
        <Link to="news">
          <h3>Ajouter une news</h3>
        </Link>
        <hr />
        <h2>Jobs</h2>
        {allJobs}
        <hr />
        <h2>Annonces</h2>
        <hr />
        <h2>News</h2>
      </div>
    );
  }
}

Dashboard.propTypes = {
  jobs: PropTypes.object.isRequired,
  ads: PropTypes.object.isRequired,
  news: PropTypes.object.isRequired,
  getAllAds: PropTypes.func.isRequired,
  getAllJobs: PropTypes.func.isRequired,
  getAllNews: PropTypes.func.isRequired,
  deleteAd: PropTypes.func.isRequired,
  deleteJob: PropTypes.func.isRequired,
  deleteNews: PropTypes.func.isRequired
};
const mapStatetoProps = state => ({
  jobs: state.jobs,
  ads: state.ads,
  news: state.news
});
export default connect(
  mapStatetoProps,
  { getAllAds, getAllJobs, getAllNews, deleteNews, deleteAd, deleteJob }
)(Dashboard);
