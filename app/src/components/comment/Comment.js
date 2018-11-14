import React, { Component } from "react";
import PropTypes from "prop-types";

class Comment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="form-group input-group">
          <textarea
            className="form-control"
            style={{ width: "100%", height: 100 }}
            placeholder="Votre commentaire..."
            name="commentInput"
            onChange={this.props.handleChange}
          />
        </div>
        <div className="form-group input-group">
          <input
            type="submit"
            className="btn btn-primary mx-auto"
            value="Commenter"
            style={{ width: "50%" }}
          />
        </div>
      </form>
    );
  }
}
export default Comment;
