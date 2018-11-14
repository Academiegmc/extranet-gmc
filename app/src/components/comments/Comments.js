import React, { Component } from "react";
import PropTypes from "prop-types";

class Comments extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const divFlex = {
      display: "flex",
      flexFlow: "row wrap",
      alignItems: "flex-start",
      width: "100%"
    };
    const comments =
      this.props.comments.length > 0
        ? this.props.comments.map((comment, index) => (
            <div className="card" key={index} style={divFlex}>
              <div className="card-body">
                <h4 className="card-title">{comment.name}</h4>
                <p className="card-text">{comment.text}</p>
              </div>
              <hr />
            </div>
          ))
        : null;
    return comments;
  }
}
export default Comments;
