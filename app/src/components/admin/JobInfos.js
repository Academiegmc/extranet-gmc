import React, { Component } from "react";
import PropTypes from "prop-types";
import { deleteJob } from "../../actions/jobActions";
class JobInfos extends Component {
  constructor(props) {
    super(props);
    this.deleteAJob = this.deleteAJob.bind(this);
  }
  deleteAJob() {
    deleteJob(this.props.job._id);
    this.props.refresh();
  }
  render() {
    const { job } = this.props;
    return (
      <div className="flex-row">
        <h6 className="text-center">{job.jobTitle}</h6>
        <i onClick={this.deleteAJob} className="far fa-times-circle" />
      </div>
    );
  }
}

JobInfos.propTypes = {
  job: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired
};

export default JobInfos;
