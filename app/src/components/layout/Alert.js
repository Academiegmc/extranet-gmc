import React from "react";
import PropTypes from "prop-types";
import { Paper, Typography, makeStyles } from "@material-ui/core";
import { Info } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 1),
    color: "white",
    backgroundColor: "#D32F2F"
  }
}));
const Alert = ({ alert }) => {
  const classes = useStyles();
  return (
    alert !== null && (
      <Paper className={classes.root}>
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
