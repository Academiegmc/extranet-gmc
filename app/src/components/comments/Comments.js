import React, { Component } from "react";
import "./Comments.css";
class Comments extends Component {
  render() {
    const comments =
      this.props.comments.length > 0
        ? this.props.comments.map((comment, index) => (
            <div
              className="d-sm-flex flex-sm-row align-items-sm-center p-3 w-100 h-100"
              key={index}
            >
              <div className="col-6 col-md-2 d-sm-flex flex-sm-row justify-content-sm-center mr-2">
                <img
                  className="img-fluid rounded-circle align-self-center"
                  src={`http://${process.env.REACT_APP_NODE_API}/profiles/${
                    comment.profile_pic
                  }`}
                  alt="User pic"
                />
              </div>
              <div className="col-6 col-md-2 d-sm-flex flex-sm-column">
                <h6 className="card-title">{comment.name}</h6>
                <p className="card-text text-justify text-wrap">
                  {comment.text}
                </p>
              </div>
            </div>
          ))
        : null;
    return comments;
  }
}
export default Comments;
