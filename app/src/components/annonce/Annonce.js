import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import { getAnAd, updateComments } from "../../actions/adAction";
import Comments from "../comments/Comments";
import Comment from "../comment/Comment";
import "./Annonce.css";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Divider,
  makeStyles,
  CardHeader,
  Avatar
} from "@material-ui/core";
import ReturnButton from "../layout/ReturnButton";
import Breadcrumb from "../layout/Breadcrumb";
const useStyles = makeStyles(theme => ({
  cardHader: {
    backgroundColor: "#2F4858",
    color: "white"
  },
  cardContent: {
    height: "250px",
    overflowY: "scroll"
  },
  divider: {
    visibility: "hidden",
    marginTop: "20px"
  },
  bigAvatar: {
    width: 100,
    height: 100
  },
  title: {
    color: "white"
  },
  subtitle: {
    textTransform: "capitalize",
    fontStyle: "italic",
    fontSize: "1rem"
  }
}));
const Annonce = ({
  ads: { loading, ad },
  auth,
  getAnAd,
  history,
  match,
  updateComments
}) => {
  const [comment, setComment] = useState(null);
  const [text, setText] = useState("");
  const [disallowedTypes, setDisallowedTypes] = useState([
    "image",
    "html",
    "inlineCode",
    "code"
  ]);
  const classes = useStyles();
  useEffect(() => {
    getAnAd(match.params.id);
  }, []);
  const handleChange = e => {
    e.preventDefault();
    setText(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (text !== "") {
      //On ne lance l'envoi du comment si et seulement si un commentaire est écrit
      if (comment !== null) {
        updateComments(match.params.id, comment);
        setText("");
      }
    }
  };

  let comments = null;
  if (loading || auth === null || ad === null) {
    return <h3>Chargement...</h3>;
  }
  comments = <Comments comments={ad.comments} />;
  const links = [
    { title: "Annonces", url: "/annonces" },
    { title: ad.title, url: `/annonce/${ad.id}` }
  ];
  return (
    <Fragment>
      <Container>
        <Breadcrumb links={links} />
        {/* <ReturnButton history={history} /> */}
        <Card>
          <CardHeader
            className={classes.cardHader}
            avatar={
              <Avatar
                alt={ad.user.name}
                src={`${process.env.REACT_APP_NODE_API}/api/users/image/${
                  ad.user.profile_pic
                }`}
                className={classes.bigAvatar}
              />
            }
            title={
              <Typography variant="h5" component="h2">
                {ad.title}
              </Typography>
            }
            subheader={
              <Fragment>
                <Typography
                  className={classes.subtitle}
                  variant="h6"
                  component="h3"
                  style={{ color: "white" }}
                >
                  {ad.category}
                </Typography>
                <Typography
                  className={classes.subtitle}
                  variant="body2"
                  component="p"
                  style={{ color: "white" }}
                >
                  <Moment format="DD MMMM YYYY, HH:MM" locale="fr">
                    {ad.date}
                  </Moment>
                </Typography>
              </Fragment>
            }
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              <ReactMarkdown
                source={ad.description}
                disallowedTypes={disallowedTypes}
                linkTarget={"_blank"}
              />
            </Typography>
          </CardContent>
        </Card>
        {ad.comments.length > 0 && (
          <Fragment>
            <Divider className={classes.divider} variant="fullWidth" />
            <Card>
              <CardHeader
                className={classes.cardHader}
                title={
                  <Typography variant="h5" component="h2">
                    Commentaires
                  </Typography>
                }
              />
              <CardContent className={classes.cardContent}>
                {comments}
              </CardContent>
            </Card>
          </Fragment>
        )}
        <Divider className={classes.divider} variant="fullWidth" />
        <Card>
          <CardHeader
            className={classes.cardHader}
            title={
              <Typography variant="h5" component="h2">
                Ajouter un commentaire
              </Typography>
            }
          />
          <CardContent>
            <Comment
              text={text}
              setText={setText}
              setComment={setComment}
              auth={auth}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </CardContent>
        </Card>
      </Container>
    </Fragment>
  );
};

Annonce.propTypes = {
  ads: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  ads: state.ads,
  auth: state.auth,
  users: state.users
});
export default connect(
  mapStateToProps,
  { getAnAd, updateComments }
)(Annonce);
