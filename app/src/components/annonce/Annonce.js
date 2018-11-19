import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAnAd, updateComments } from "../../actions/adAction";
import Comments from "../comments/Comments";
import Comment from "../comment/Comment";
import ReturnButton from "../layout/ReturnButton";
import { urls } from "../../utils";
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
    this.props.updateComments(this.props.match.params.id, this.state.comment);
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
      <div className="container">
        <ReturnButton url={urls.ads} />
        <h1>Annonce</h1>
        <div className="card">
          <div className="mx-auto">
            <h4 className="card-title">{ad.title}</h4>
            <h5 className="card-subtitle mb-2 text-muted">
              Posté par : {ad.name}
            </h5>
          </div>
          <p className="card-text">{ad.description}</p>
        </div>
        <hr />
        <h2>Commentaires</h2>
        {comments}
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
