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
const useStyles = makeStyles(theme => ({
  root: {
    // width: "50%",
    // margin: "auto"
  },
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
  match,
  updateComments
}) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     ad: {},
  //     user: "",
  //     userName: "",
  //     profile_pic: "",
  //     comment: {},
  //     disallowedTypes: ["image", "html", "inlineCode", "code"]
  //   };
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  //   this.getComments = this.getComments.bind(this);
  // }
  // const [ad, setAd] = useState(null);
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
    console.log(text, e.target.value);
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
  return (
    <Fragment>
      <h1>Annonce</h1>
      <Container>
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
                  variant="p"
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
        <Divider className={classes.divider} variant="fullWidth" />
        <Card className={classes.root}>
          <CardHeader
            className={classes.cardHader}
            title={
              <Typography variant="h5" component="h2">
                Commentaires
              </Typography>
            }
          />
          <CardContent className={classes.cardContent}>{comments}</CardContent>
        </Card>
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
    // <div className="container flex-column flex-center">
    //   {/* <ReturnButton history={history} /> */}
    //   <h1>Annonce</h1>
    //   <div className="card annonce rounded">
    //     <div className="d-flex flex-row w-100 p-3 rounded" style={style}>
    //       <div className="annonce-category d-flex flex-row justify-content-center bg-light rounded-circle">
    //         {categoryIcon}
    //       </div>
    //       {/* {ad.category} */}
    //     </div>
    //     <div className="p-3">
    //       <h6 className="card-subtitle mb-2 text-muted text-capitalize">
    //         {ad.name}
    //       </h6>
    //       <h2 className="card-title">{ad.title}</h2>
    //       <ReactMarkdown
    //         className="card-text text-justify"
    //         source={ad.description}
    //         disallowedTypes={disallowedTypes}
    //       />
    //       {/* <p className="card-text text-justify">{ad.description}</p> */}
    //       <hr />
    //       <div className="d-flex justify-content-between">
    //         <div className="badge badge-light p-2">
    //           Il y a{" "}
    //           <Moment fromNow ago locale="fr">
    //             {ad.date}
    //           </Moment>
    //         </div>
    //         <div className="badge badge-light text-uppercase p-2">
    //           <i className="far fa-comments" style={{ fontSize: "15px" }}>
    //             {ad.comments !== undefined ? ` ${ad.comments.length}` : null}
    //           </i>
    //         </div>
    //       </div>
    //       <hr />
    //       <div className="d-flex flex-column m-3">{comments}</div>
    //     </div>
    //     <hr />
    // <Comment
    //   onChange={this.onChange}
    //   handleChange={this.handleChange}
    //   handleSubmit={this.handleSubmit}
    // />
    //   </div>
    // </div>
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
