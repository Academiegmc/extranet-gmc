import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ReturnButton.css";
class ReturnButton extends Component {
  render() {
    const { history } = this.props;
    return (
      <button className="button-return" onClick={history.goBack}>
        <i className="fas fa-arrow-circle-left" />
        Retour
      </button>
    );
  }
}

ReturnButton.propTypes = {
  history: PropTypes.object.isRequired
};

export default ReturnButton;
