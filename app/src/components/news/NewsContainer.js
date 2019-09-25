import React, {
  useEffect,
  useState,
  lazy,
  Suspense,
  useLayoutEffect,
  Fragment
} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllNews } from "../../actions/newsActions";
import { makeStyles, CircularProgress } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  grid: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  progress: {
    margin: theme.spacing(2)
  }
}));
const NewsContainer = ({ news: { totalPages }, getAllNews }) => {
  const classes = useStyles();

  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const LazyNews = lazy(() => import("./NewsFeed"));

  useEffect(() => {
    getAllNews(page);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (!isFetching || page > totalPages) return;
    fetchNews();
  }, [isFetching]);
  const fetchNews = () => {
    setPage(page + 1);
    getAllNews(page + 1);
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
        <LazyNews />
      </Suspense>
      {isFetching && (
        <div className={classes.grid}>
          <CircularProgress className={classes.progress} />
        </div>
      )}
    </Fragment>
  );
};

NewsContainer.propTypes = {
  getAllNews: PropTypes.func.isRequired,
  news: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  news: state.news
});
export default connect(
  mapStateToProps,
  { getAllNews }
)(NewsContainer);
