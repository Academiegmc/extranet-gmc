import React, { Component } from "react";
import "./Comments.css";
import User from "../../assets/user.jpg";
class Comments extends Component {
  render() {
    const comments =
      this.props.comments.length > 0
        ? this.props.comments.map((comment, index) => (
            <div
              className="d-sm-flex flex-sm-row align-items-sm-center p-3 w-100 h-100"
              key={index}
            >
              <div className=" col-1 d-sm-flex flex-sm-row justify-content-sm-center mr-2">
                <img
                  className="img-fluid rounded-circle img-circle align-self-center"
                  src={User}
                  alt="User picture"
                />
              </div>
              <div className="d-sm-flex flex-sm-column">
                <h6 className="card-title">{comment.name}</h6>
                <small className="card-text text-justify text-wrap">
                  {comment.text}
                </small>
              </div>
            </div>
          ))
        : null;
    return comments;
  }
}
export default Comments;
