import React, { Component } from "react";
import UserIcon from "../../assets/user_icon.png";

import "./Comments.css";
class Comments extends Component {
  render() {
    let img;
    const comments =
      this.props.comments.length > 0
        ? this.props.comments.map((comment, index) => {
            if (comment.profile_pic !== undefined)
              img = `http://${process.env.REACT_APP_NODE_API}/profiles/${
                comment.profile_pic
              }`;
            else img = UserIcon;
            return (
              <div
                className="d-flex flex-row align-items-center p-3 w-100 h-100"
                key={index}
              >
                <div className="col-6 col-md-2 d--flex flex-row justify-content-center mr-2">
                  <img
                    className="img-fluid w-50 h-50 rounded-circle align-self-center"
                    src={img}
                    alt="User pic"
                  />
                </div>
                <div className="col-6 col-md-2 d-flex flex-column">
                  <h6 className="card-title font-weight-bold">
                    {comment.name}
                  </h6>
                  <small className="card-text text-wrap">{comment.text}</small>
                </div>
              </div>
            );
          })
        : null;
    return comments;
  }
}
export default Comments;
