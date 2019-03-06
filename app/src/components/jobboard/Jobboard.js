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
      console.log(nextProps.jobs);
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
          <div className="row" style={{ borderColor: "#333B3E" }}>
            <div className="col-sm-2 col-md-2 col-xs-6">
              <strong style={{ display: "block" }}>
                {job.jobContractType.toUpperCase()}
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
        <ReturnButton history={this.props.history} />
        <h3 className="text-center">Job board</h3>
        <div className="input-group">
          <span className="input-group-text" id="basic-addon1">
            <i className="fas fa-newspaper"> </i>
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
            to={`/job/${this.state.job_chose.id}`}
            className="btn btn-primary"
          >
            <i className="fas fa-search"> </i>
          </Link>
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
  { getAllJobs, searchJob }
)(Jobboard);
