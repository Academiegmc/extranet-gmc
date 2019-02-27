import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
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
      comment: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getComments = this.getComments.bind(this);
  }
  handleChange = e => {
    e.preventDefault();
    let myComment = {
      text: e.target.value,
      user: this.state.user,
      name: this.state.userName
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
      this.getComments();
      document.getElementsByName("commentInput")[0].value = ""; //On rend l'input vide lorsque le commentaire est envoyé
    }
  };
  getComments = () => {
    this.props.getAnAd(this.props.match.params.id);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.ads.ad.data) this.setState({ ad: nextProps.ads.ad.data });
    if (nextProps.auth.user)
      this.setState({
        user: nextProps.auth.user.id,
        userName: nextProps.auth.user.name
      });
  }
  componentDidMount() {
    this.props.getAnAd(this.props.match.params.id);
  }

  render() {
    const { ad } = this.state;
    let comments = null;
    if (ad.comments !== undefined && ad.comments.length > 0)
      comments = <Comments comments={ad.comments} />;
    return (
      <div className="container flex-column flex-center">
        <ReturnButton history={this.props.history} />
        <h1>Annonce</h1>
        <div className="card p-3">
          <div className="">
            <h6 className="card-subtitle mb-2 text-muted text-capitalize">
              {ad.name}
            </h6>
            <h2 className="card-title">{ad.title}</h2>
          </div>
          <p className="card-text text-justify">{ad.description}</p>
          <hr />
          <div className=" d-inline-flex justify-content-between">
            <div className="badge badge-light p-2">
              Il y a{" "}
              <Moment fromNow ago locale="fr">
                {ad.date}
              </Moment>
            </div>
            <div className="badge badge-light text-uppercase p-2">
              <i className="far fa-comments" style={{ fontSize: "15px" }}>
                {ad.comments !== undefined ? ad.comments.length : null}
              </i>
            </div>
          </div>
        </div>
        <hr />
        <h2>Commentaires</h2>
        <div className="d-flex flex-column card m-3">{comments}</div>
        <Comment
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
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
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getAnAd, updateComments }
)(Annonce);
