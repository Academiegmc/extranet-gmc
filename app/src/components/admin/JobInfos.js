import React, { Component } from "react";
import PropTypes from "prop-types";
import { deleteJob } from "../../actions/jobActions";
class JobInfos extends Component {
  constructor(props) {
    super(props);
    this.deleteAJob = this.deleteAJob.bind(this);
  }
  deleteAJob() {
    deleteJob(this.props.job.id);
    this.props.refresh();
  }
  render() {
    const { job } = this.props;
    return (
      <div className="d-flex flex-row flex-wrap">
        <i
          onClick={this.deleteAJob}
          className="btn btn-outline-danger far fa-times-circle"
        />
        <h6 className="text-center ml-2 mt-2">{job.jobTitle}</h6>
      </div>
    );
  }
}

JobInfos.propTypes = {
  job: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired
};

export default JobInfos;
