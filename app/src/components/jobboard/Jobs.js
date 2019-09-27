import React from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Typography,
  Grid,
  CardActionArea,
  makeStyles,
  Paper
} from "@material-ui/core";
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
  text: {
    // fontSize: "12px"
  },
  uppercase: { textTransform: "uppercase" },

  gridItem: {
    height: "100%",
    marginTop: 20,
    marginBottom: 20
  }
}));

const Jobs = ({ jobs: { jobs, loading } }) => {
  const classes = useStyles();
  let showJobs;
  console.log({ loading });
  if (jobs.length > 0) {
    showJobs = jobs.map(job => {
      return (
        <Grid className={classes.gridItem} item key={job.id} xs={12}>
          <RouterLink to={`/job/${job.id}`}>
            <CardActionArea>
              <Paper className={classes.cardContent}>
                <Typography
                  className={clsx(classes.text, classes.uppercase)}
                  varient="p"
                  component="p"
                >
                  {job.jobContractType}
                </Typography>
                <Typography className={classes.text} varient="p" component="p">
                  {job.jobTitle}
                </Typography>
                <Typography className={classes.text} varient="p" component="p">
                  {job.jobCompany}
                </Typography>
              </Paper>
            </CardActionArea>
          </RouterLink>
        </Grid>
      );
    });
  } else {
    showJobs = (
      <Typography variant="h3" component="h3">
        Les offres arrivent très bientôt !
      </Typography>
    );
  }
  return showJobs;
};

Jobs.propTypes = {
  jobs: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  jobs: state.jobs
});
export default connect(
  mapStateToProps,
  null
)(Jobs);
