import React, { Component } from "react";
import TextareaAutosize from "react-autosize-textarea";
class Comment extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="form-group input-group">
          {/* <textarea
            className="form-control"
            // style={{ width: "100%", height: 100 }}
            placeholder="Votre commentaire..."
            name="commentInput"
            onChange={this.props.handleChange}
          /> */}
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
            style={{ width: "50%" }}
          />
        </div>
      </form>
    );
  }
}
export default Comment;
