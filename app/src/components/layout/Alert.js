import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Paper, Typography, makeStyles, Button } from "@material-ui/core";
import { Info } from "@material-ui/icons";

import { logout } from "../../actions/authActions";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 1),
    color: "white"
  },
  success: { backgroundColor: "#43A047" },
  error: { backgroundColor: "#D32F2F" },
  btnLogin: {
    padding: theme.spacing(2),
    border: "1px solid black",
    backgroundColor: "white",
    borderRadius: "10px",
    textDecoration: "none",
    color: "black",
    fontSize: "1rem",
    cursor: "pointer"
  }
}));
const Alert = ({ alert, setAlert, logout }) => {
  const classes = useStyles();
  const logoutUser = () => {
    logout();
    setAlert(null);
  };
  return (
    alert !== null && (
      <Paper
        className={
          alert.type === "error"
            ? clsx(classes.root, classes.error)
            : clsx(classes.root, classes.success)
        }
      >
        <Typography component="p">
          <Info /> {alert.msg}{" "}
          {!alert.auth && (
            <Button className={classes.btnLogin} onClick={logoutUser}>
              Reconnectez-vous
            </Button>
          )}
        </Typography>
      </Paper>
    )
  );
};

Alert.propTypes = {
  alert: PropTypes.object,
  setAlert: PropTypes.func.isRequired,
  logout: PropTypes.func
};

export default connect(
  null,
  { logout }
)(Alert);
