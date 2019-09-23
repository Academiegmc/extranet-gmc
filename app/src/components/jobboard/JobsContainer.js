import React, { useEffect, useState, lazy, Suspense, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles, CircularProgress } from "@material-ui/core";

import { getAllJobs } from "../../actions/jobActions";

const useStyles = makeStyles(theme => ({
  grid: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "start"
  },
  progress: {
    margin: theme.spacing(2)
  }
}));
const JobsContainer = ({ getAllJobs }) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const LazyJobs = lazy(() => import("./Jobs"));
  useEffect(() => {
    getAllJobs();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (!isFetching) return;
    fetchJobs();
  }, [isFetching]);
  const fetchJobs = () => {
    setPage(page + 1);
    getAllJobs(page + 1);
    setIsFetching(false);
  };
  const handleScroll = e => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = Math.round(windowHeight + window.pageYOffset);
    if (windowBottom >= docHeight) {
      setIsFetching(true);
      console.log("Fetch more news");
    }
  };
  return (
    <Fragment>
      <Suspense
        fallback={
          <div className={classes.grid}>
            <CircularProgress className={classes.progress} />
          </div>
        }
      >
        {<LazyJobs />}
      </Suspense>
      {isFetching && (
        <div className={classes.grid}>
          <CircularProgress className={classes.progress} />
        </div>
      )}
    </Fragment>
  );
};

JobsContainer.propTypes = {
  // jobs: PropTypes.object.isRequired,
  getAllJobs: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  job: state.jobs
});
export default connect(
  mapStateToProps,
  { getAllJobs }
)(JobsContainer);
