import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import ReactAutocomplete from "react-autocomplete";
import { getAllJobs, searchJob } from "../../actions/jobActions";
import ReturnButton from "../layout/ReturnButton";
class Jobboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      jobSearched: [],
      value: "",
      items: [],
      job_chose: {}
    };
    this.searchJobs = this.searchJobs.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.jobs) {
      const { jobs, search_jobs } = nextProps.jobs;
      if (jobs.data) this.setState({ jobs: jobs.data });
      if (search_jobs) this.setState({ items: search_jobs });
    }
  }
  componentDidMount() {
    this.props.getAllJobs();
  }
  searchJobs(e) {
    this.props.searchJob(e);
    this.setState({ value: e });
  }
  render() {
    const jobs = this.state.jobs.map((job, index) => (
      <div key={index}>
        <Link to={`/job/${job.id}`}>
          <div
            className="d-flex flex-row justify-content-between w-100"
            style={{ color: "#333B3E" }}
          >
            {/* <div className="row" style={{ borderColor: "#333B3E" }}> */}
            {/* <div className="col-sm-2 col-md-2 col-6"> */}
            <div className="">
              <strong>{job.jobContractType.toUpperCase()}</strong>
              <span>{job.type}</span>
            </div>
            {/* <div className="col-sm-4 col-md-4 col-xs-6"> */}
            <div className="">
              <strong>{job.jobTitle}</strong>
            </div>
            {/* <div className="col-sm-3 col-md-3 col-xs-5"> */}
            <div className="">
              <strong>{job.jobCity}</strong>
              <span>{job.country}</span>
            </div>
            {/* <div className="col-sm-2 col-md-2 col-xs-6"> */}
            <div className="">
              <strong className="mr-2">Posté le </strong>
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
        <ReturnButton history={this.props.history} />
        <h3 className="text-left">Job board</h3>
        <div className="input-group">
          <span className="input-group-text" id="basic-addon1">
            <i className="fas fa-suitcase"> </i>
          </span>
          <ReactAutocomplete
            className="form-control"
            items={this.state.items}
            shouldItemRender={(item, value) =>
              item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
            }
            getItemValue={item => item.title}
            renderItem={(item, highlighted) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: highlighted ? "#eee" : "transparent"
                }}
              >
                <p
                  onClick={() => {
                    this.setState({ job_chose: item });
                  }}
                >
                  {item.title}
                </p>
              </div>
            )}
            renderInput={props => (
              <input
                {...props}
                role="combobox"
                name="search"
                className="form-control"
              />
            )}
            value={this.state.value}
            onChange={e => {
              this.searchJobs(e.target.value);
              if (this.state.value === "") this.setState({ job_chose: {} });
            }}
            onSelect={(value, item) =>
              this.setState({ value, job_chose: item })
            }
            wrapperStyle={{ display: "inline-block", width: "40%" }}
          />
          <Link
            to={`/job/${this.state.job_chose._id}`}
            className="btn btn-primary"
          >
            <i className="fas fa-search"> </i>
          </Link>
        </div>
        <hr />
        <div className="d-flex flex-column">
          {jobs.length > 0 ? (
            jobs
          ) : (
            <h3 className="text-center my-5">
              La pluie d'emplois arrive très bientôt !
            </h3>
          )}
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
  { getAllJobs, searchJob }
)(Jobboard);
