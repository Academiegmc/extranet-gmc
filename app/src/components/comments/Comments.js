import React, { Component } from "react";

class Comments extends Component {
  render() {
    const comments =
      this.props.comments.length > 0
        ? this.props.comments.map((comment, index) => (
            <div className="p-3" key={index}>
              <h5 className="card-title">{comment.name}</h5>
              <p className="card-text">{comment.text}</p>
              <hr />
            </div>
          ))
        : null;
    return comments;
  }
}
export default Comments;
