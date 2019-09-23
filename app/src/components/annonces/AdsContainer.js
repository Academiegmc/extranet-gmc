import React, { Fragment, useState, useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles, CircularProgress } from "@material-ui/core";

import { getAllAds } from "../../actions/adAction";

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
const AdsContainer = ({ ads, getAllAds }) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const LazyAds = lazy(() => import("./AdsFeed"));
  useEffect(() => {
    getAllAds();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (!isFetching) return;
    fetchJobs();
  }, [isFetching]);
  const fetchJobs = () => {
    setPage(page + 1);
    getAllAds(page + 1);
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
          <div className={classes.gridProcess}>
            <CircularProgress className={classes.progress} />
          </div>
        }
      >
        <LazyAds />
      </Suspense>
    </Fragment>
  );
};

AdsContainer.propTypes = {
  ads: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  ads: state.ads
});
export default connect(
  mapStateToProps,
  { getAllAds }
)(AdsContainer);
