import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CardMedia, Typography, makeStyles } from "@material-ui/core";
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
  let status;
  let imgNews;
  let showNews;
  if (newsTab.length > 0) {
    showNews = newsTab.map(news => {
      imgNews = news.images.map((img, i) => (
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
  } else {
    showNews = (
      <Typography variant="body2" component="h3">
        Les news vont bientôt tomber !
      </Typography>
    );
  }
  return showNews;
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
