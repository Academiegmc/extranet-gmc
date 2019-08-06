import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ReturnButton.css";
import { Button, makeStyles } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

const useStyle = makeStyles(theme => ({
  root: {
    marginTop: 20,
    marginBottom: 20
  }
}));
const ReturnButton = ({ history }) => {
  const classes = useStyle();
  return (
    <Button className={classes.root} onClick={history.goBack}>
      <ArrowBack />
      Retour
    </Button>
  );
};

ReturnButton.propTypes = {
  history: PropTypes.object.isRequired
};

export default ReturnButton;
