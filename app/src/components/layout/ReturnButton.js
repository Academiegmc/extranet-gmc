import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
class ReturnButton extends Component {
  render() {
    return (
      <div>
        <i className="fas fa-arrow-circle-left mr-2" />
        <Link to={this.props.url}>Retour</Link>
      </div>
    );
  }
}

ReturnButton.propTypes = {
  url: PropTypes.string.isRequired
};

export default ReturnButton;
