import React, { Component } from "react";
import PropTypes from "prop-types";
class ReturnButton extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <button onClick={history.goBack}>
          <i className="fas fa-arrow-circle-left mr-2" />
          Retour
        </button>
      </div>
    );
  }
}

ReturnButton.propTypes = {
  history: PropTypes.object.isRequired
};

export default ReturnButton;
