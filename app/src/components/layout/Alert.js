import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Paper, Typography, makeStyles } from "@material-ui/core";
import { Info } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 1),
    color: "white"
  },
  success: { backgroundColor: "#43A047" },
  error: { backgroundColor: "#D32F2F" }
}));
const Alert = ({ alert }) => {
  const classes = useStyles();
  console.log(alert);
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
          <Info /> {alert.msg}
        </Typography>
      </Paper>
    )
  );
};

Alert.propTypes = {
  alert: PropTypes.object
};

export default Alert;
