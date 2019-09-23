import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CardMedia, makeStyles } from "@material-ui/core";
import { apiUrl } from "../../utils";
import { updateNewsComments } from "../../actions/newsActions";
import NewsCard from "./NewsCard";
const useStyles = makeStyles(theme => ({
  media: {
    height: 200
  }
}));

const NewsFeed = ({ news: { newsTab }, auth, updateNewsComments }) => {
  const classes = useStyles();
  return newsTab.map(news => {
    let status;
    let imgNews = news.images.map((img, i) => (
      <CardMedia
        className={classes.media}
        image={`${apiUrl}/api/news/image/news/${img}`}
        title={`Card image cap ` + i}
        key={i}
      />
    ));
    switch (auth.user.status) {
      case 0:
        status = "élève";
        break;
      case 1:
        status = "Ancien élève";
        break;
      case 2:
        status = "Professeur";
        break;
      case 3:
        status = "Administrateur";
        break;
      default:
        break;
    }
    return (
      <NewsCard
        key={news.id}
        news={news}
        auth={auth}
        updateNewsComments={updateNewsComments}
        imgNews={imgNews}
      />
    );
  });
};

NewsFeed.propTypes = {
  news: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  news: state.news,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { updateNewsComments }
)(NewsFeed);
