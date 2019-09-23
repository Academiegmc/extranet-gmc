import React, { useState, useEffect, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchJob } from "../../actions/jobActions";
import ReturnButton from "../layout/ReturnButton";
import {
  Container,
  Typography,
  Grid,
  makeStyles,
  Button,
  TextField
} from "@material-ui/core";
import Breadcrumb from "../layout/Breadcrumb";
import JobsContainer from "./JobsContainer";
const useStyles = makeStyles(theme => ({
  cardContent: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      flexFlow: "row wrap"
    }
  },
  paper: {
    textAlign: "center",
    padding: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(2)
    }
  },
  textField: {
    width: "100%"
  },
  button: {
    backgroundColor: "#c9b8b7",
    color: "#fff",
    width: "100%",
    marginTop: "5px",
    marginBottom: "5px"
  },
  control: {
    width: "100%"
  },
  text: {},
  uppercase: { textTransform: "uppercase" },
  grid: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "start"
  },
  gridItem: {
    height: "100%",
    marginTop: 20,
    marginBottom: 20
  },
  progress: {
    margin: theme.spacing(2)
  }
}));
const Jobboard = ({ jobs, searchJob, history }) => {
  const [value, setValue] = useState("");
  const classes = useStyles();

  const links = [{ title: "Job Board", url: "/jobboard" }];
  return (
    <Container>
      <Breadcrumb links={links} />
      <Grid className={classes.grid} container>
        <Grid className={classes.paper} item xs={12} sm={3}>
          <Typography variant="h5" component="h5">
            Rechercher un job
          </Typography>
          <Grid item xs={12}>
            <TextField
              id="standard-name"
              label="Rechercher un job"
              className={classes.textField}
              value={value}
              variant="outlined"
              onChange={e => {
                setValue(e.target.value);
                searchJob(e.target.value);
              }}
              margin="normal"
            />
          </Grid>
          <Grid
            container
            item
            direction="column"
            justify="space-around"
            alignItems="center"
          >
            <Grid item xs={12} className={classes.control}>
              <Button
                className={classes.button}
                onClick={() => searchJob(value, "cdi")}
              >
                CDI
              </Button>
            </Grid>
            <Grid item xs={12} className={classes.control}>
              <Button
                className={classes.button}
                onClick={() => searchJob(value, "cdd")}
              >
                CDD
              </Button>
            </Grid>
            <Grid item xs={12} className={classes.control}>
              <Button
                className={classes.button}
                onClick={() => searchJob(value, "alternance")}
              >
                Alternance
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={9}>
          <ReturnButton history={history} />
          <JobsContainer />
        </Grid>
      </Grid>
    </Container>
  );
};

Jobboard.propTypes = {
  searchJob: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired
};
const mapStateToprops = state => ({
  jobs: state.jobs
});
export default connect(
  mapStateToprops,
  { searchJob }
)(Jobboard);
