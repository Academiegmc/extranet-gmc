import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ReturnButton.css";
import { Button } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
class ReturnButton extends Component {
  render() {
    const { history } = this.props;
    return (
      <Button onClick={history.goBack}>
        <ArrowBack />
        Retour
      </Button>
    );
  }
}

ReturnButton.propTypes = {
  history: PropTypes.object.isRequired
};

export default ReturnButton;
