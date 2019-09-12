import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import Slider from "react-slick";
import ReactMarkdown from "react-markdown";

import {
  Card,
  CardActions,
  CardContent,
  Typography,
  makeStyles,
  Divider
} from "@material-ui/core";
import { TodayOutlined, CommentOutlined } from "@material-ui/icons";

import Comment from "../comment/Comment";
import settings from "./newsCarouselConfig";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  card: {
    maxWidth: "100%",
    marginTop: "20px"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    fontFamily: "Lato"
  },
  media: {
    height: 200
  },
  mediaHeader: {
    height: 75,
    width: 75,
    borderRadius: "50%"
  },
  input: {
    display: "none"
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  }
}));

const NewsCard = ({ news, auth, match, updateNewsComments, imgNews }) => {
  const { user } = auth;
  let status;
  let commentsLength = 0;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [commentId, setCommentId] = useState("");
  const [disallowedTypes, setDisallowedTypes] = useState([
    "image",
    "html",
    "inlineCode",
    "code"
  ]);

  const [text, setText] = useState("");
  const [comment, setComment] = useState(null);

  const classes = useStyles();

  return (
    <Card className={classes.card} key={news.id}>
      {news.images.length > 0 ? <Slider {...settings}>{imgNews}</Slider> : null}
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {news.title}
        </Typography>
        <Divider />
        <Typography gutterBottom variant="body2" color="textSecondary">
          <ReactMarkdown
            source={news.description}
            disallowedTypes={disallowedTypes}
            linkTarget={"_blank"}
          />
        </Typography>
        <Divider />
        <Typography
          style={{ marginBottom: 20, marginTop: 20 }}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          <small
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%"
              }}
            >
              <TodayOutlined style={{ marginRight: 2 }} />
              <Moment format="DD MMM, YYYY" locale="fr">
                {news.date}
              </Moment>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%"
              }}
            >
              <CommentOutlined style={{ marginRight: 2 }} />
              {news.comments.length}
            </div>
          </small>
        </Typography>
        <Divider />
        {news.comments.length > 0 && (
          <Fragment>
            <Typography variant="h6" component="h6">
              Commentaires
            </Typography>
            <Fragment>
              {news.comments.map((comment, index) => (
                <Typography key={index} variant="body1" component="p">
                  {`${comment.user.name} - ${comment.text}`}
                </Typography>
              ))}
            </Fragment>
            <Divider />
          </Fragment>
        )}
      </CardContent>
      <CardActions>
        <Comment
          text={text}
          setText={setText}
          setComment={setComment}
          auth={auth}
          comment={comment}
          handleSubmit={e => {
            e.preventDefault();
            if (text !== "") {
              //On ne lance l'envoi du comment si et seulement si un commentaire est écrit
              if (comment !== null) {
                console.log(comment, match, text);
                updateNewsComments(news.id, comment);
                setText("");
              }
            }
          }}
        />
      </CardActions>
    </Card>
  );
};

NewsCard.propTypes = {
  news: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  updateNewsComments: PropTypes.func.isRequired
};

export default NewsCard;
