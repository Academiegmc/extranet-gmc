import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import { getAnAd, updateComments } from "../../actions/adAction";
import Comments from "../comments/Comments";
import Comment from "../comment/Comment";
import ReturnButton from "../layout/ReturnButton";
import "./Annonce.css";
class Annonce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ad: {},
      user: "",
      userName: "",
      profile_pic: "",
      comment: {},
      disallowedTypes: ["image", "html", "inlineCode", "code"]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getComments = this.getComments.bind(this);
  }

  handleChange = e => {
    e.preventDefault();
    let myComment = {
      text: e.target.value,
      user: this.state.user
    };
    this.setState({ comment: myComment });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (document.getElementsByName("commentInput")[0].value !== "") {
      //On ne lance l'envoi du comment si et seulement si un commentaire est écrit
      this.props.updateComments(
        this.props.match.params.id,
        this.state.comment,
        this.props.history
      );
      this.props.getAnAd(this.props.match.params.id);
      // this.getComments();
      document.getElementsByName("commentInput")[0].value = ""; //On rend l'input vide lorsque le commentaire est envoyé
    }
  };
  getComments = () => {
    this.props.getAnAd(this.props.match.params.id);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.ads.ad.data) this.setState({ ad: nextProps.ads.ad.data });
    if (nextProps.auth.user) {
      this.setState({
        user: nextProps.auth.user.id,
        userName: nextProps.auth.user.name,
        profile_pic: nextProps.auth.user.profile_pic
      });
    }
  }
  componentDidMount() {
    this.props.getAnAd(this.props.match.params.id);
  }

  render() {
    const { ad } = this.state;
    let comments = null;
    let categoryIcon;
    let style;
    if (ad.comments !== undefined && ad.comments.length > 0)
      comments = <Comments comments={ad.comments} />;
    if (ad.category === "etude") {
      categoryIcon = <i className="fas fa-user-graduate align-self-center" />;
      style = { backgroundColor: "#FF8962" };
    }
    if (ad.category === "loisir") {
      categoryIcon = <i className="fas fa-dice align-self-center" />;
      style = { backgroundColor: "#7FD1AE" };
    }
    if (ad.category === "cosmetique") {
      categoryIcon = <i className="fas fa-gift align-self-center" />;
      style = { backgroundColor: "#A46855" };
    }
    return (
      <div className="container flex-column flex-center">
        <ReturnButton history={this.props.history} />
        <h1>Annonce</h1>
        <div className="card annonce rounded">
          <div className="d-flex flex-row w-100 p-3 rounded" style={style}>
            <div className="annonce-category d-flex flex-row justify-content-center bg-light rounded-circle">
              {categoryIcon}
            </div>
            {/* {ad.category} */}
          </div>
          <div className="p-3">
            <h6 className="card-subtitle mb-2 text-muted text-capitalize">
              {ad.name}
            </h6>
            <h2 className="card-title">{ad.title}</h2>
            <ReactMarkdown
              className="card-text text-justify"
              source={ad.description}
              disallowedTypes={this.state.disallowedTypes}
            />
            {/* <p className="card-text text-justify">{ad.description}</p> */}
            <hr />
            <div className="d-flex justify-content-between">
              <div className="badge badge-light p-2">
                Il y a{" "}
                <Moment fromNow ago locale="fr">
                  {ad.date}
                </Moment>
              </div>
              <div className="badge badge-light text-uppercase p-2">
                <i className="far fa-comments" style={{ fontSize: "15px" }}>
                  {ad.comments !== undefined ? ` ${ad.comments.length}` : null}
                </i>
              </div>
            </div>
            <hr />
            <div className="d-flex flex-column m-3">{comments}</div>
          </div>
          <hr />
          <Comment
            onChange={this.onChange}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

Annonce.propTypes = {
  ads: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
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
