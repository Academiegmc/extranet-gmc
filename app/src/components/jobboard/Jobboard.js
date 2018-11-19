import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllJobs } from "../../actions/jobActions";
import Moment from "react-moment";
class Jobboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: []
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ jobs: nextProps.jobs.jobs.data });
  }
  componentDidMount() {
    this.props.getAllJobs();
  }
  render() {
    const jobs = this.state.jobs.map((job, index) => (
      <div key={index}>
        <Link to={`/job/${job._id}`}>
          <div className="row" style={{ borderColor: "#333B3E" }}>
            <div className="col-sm-2 col-md-2 col-xs-6">
              <strong style={{ display: "block" }}>
                {job.jobContractType}
              </strong>
              <span>{job.type}</span>
            </div>
            <div className="col-sm-4 col-md-4 col-xs-6">
              <strong style={{ display: "block" }}>{job.jobTitle}</strong>
            </div>
            <div className="col-sm-3 col-md-3 col-xs-5">
              <strong style={{ display: "block" }}>{job.jobCity}</strong>
              <span>{job.country}</span>
            </div>
            <div className="col-sm-2 col-md-2 col-xs-6">
              <strong style={{ display: "block" }}>Posté le </strong>
              <span>
                <Moment format="YYYY-MM-DD">{job.jobStartDate}</Moment>
              </span>
            </div>
          </div>
        </Link>
      </div>
    ));
    return (
      <div className="container">
        <h3 className="text-center">Job board</h3>
        <div className="row">
          <form className="form-inline">
            <div className="input-group mb-3 mr-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-briefcase"> </i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Mot clés"
                aria-label="Mot clés"
                aria-describedby="basic-addon1"
              />
            </div>
            <button type="submit" className="btn btn-primary mb-3">
              <i className="fas fa-search"> </i>
            </button>
          </form>
        </div>
        <hr />
        <div
          style={{
            display: "flex",
            flexFlow: "column wrap"
          }}
        >
          {jobs}
        </div>
      </div>
    );
  }
}

Jobboard.propTypes = {
  getAllJobs: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired
};
const mapStateToprops = state => ({
  jobs: state.jobs
});
export default connect(
  mapStateToprops,
  { getAllJobs }
)(Jobboard);
