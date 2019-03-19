import React, { Component } from "react";
import PropTypes from "prop-types";
import TextareaAutosize from "react-autosize-textarea";
class Comment extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="form-group input-group">
          <TextareaAutosize
            className="w-100 border-0"
            name="commentInput"
            placeholder="Votre commentaire..."
            onChange={this.props.handleChange}
          />
          <input
            type="submit"
            className="btn btn-primary mx-auto"
            value="Commenter"
          />
        </div>
      </form>
    );
  }
}

Comment.propTypes = {
  onChange: PropTypes.func
};
export default Comment;
