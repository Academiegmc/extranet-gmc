import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Paper, Typography, makeStyles } from "@material-ui/core";
import {
  Work,
  Email,
  School,
  Group,
  EventNote,
  Book,
  NewReleases,
  Today,
  Business
} from "@material-ui/icons";
import { getAllNews } from "../../actions/newsActions";
import { urls } from "../../utils";
import "./Dashboard.css";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100px",
    height: "100px",
    borderRadius: "50%"
  },
  icon: {
    margin: theme.spacing(1),
    fontSize: 32
  }
}));

const Dashboard = ({ auth }) => {
  const classes = useStyles();

  const [titles, setTitles] = useState([
    {
      title: "Mails",
      icon: <Email className={classes.icon} />,
      link: urls.mails
    },
    {
      title: "Job Board",
      icon: <Work className={classes.icon} />,
      link: "jobboard"
    },
    {
      title: "Trombinoscope",
      icon: <Group className={classes.icon} />,
      link: urls.trombinoscope
    },
    {
      title: "News",
      icon: <NewReleases className={classes.icon} />,
      link: "news"
    },
    {
      title: "Hyperplanning",
      icon: <Today className={classes.icon} />,
      link: urls.hypperplanning
    },
    {
      title: "Annonces",
      icon: <EventNote className={classes.icon} />,
      link: "annonces"
    },
    {
      title: "Classroom",
      icon: <Book className={classes.icon} />,
      link: urls.classroom
    },
    {
      title: "Règlement Intérieur",
      icon: <School className={classes.icon} />,
      link: urls.ri
    },
    {
      title: "Stages",
      icon: <Business className={classes.icon} />,
      link: "stage/"
    }
  ]);

  const { status } = auth.user;
  const links = titles.map((title, id) => {
    if (status === 0 && title.title === "Hyperplanning") {
      title.link = urls.hypperplanning + "etudiant";
    }
    if (status === 2 && title.title === "Hyperplanning")
      title.link = urls.hypperplanning + "enseignant";
    if (title.title === "Stages" && auth.user.id !== undefined) {
      title.link += auth.user.id;
    }
    return (
      <Grid
        item
        xs="auto"
        key={id}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        {title.link.indexOf("http") === -1 ? (
          <RouterLink to={title.link}>
            <Paper
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
              className={`${classes.root} text-anim`}
            >
              <Typography
                variant="h5"
                component="h3"
                className="welcome-text welcome-anim"
              >
                {title.icon}
              </Typography>
            </Paper>
          </RouterLink>
        ) : (
          <a href={`${title.link}`}>
            <Paper
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
              className={`${classes.root} text-anim`}
            >
              <Typography
                variant="h5"
                component="h3"
                className="welcome-text welcome-anim"
              >
                {title.icon}
              </Typography>
            </Paper>
          </a>
        )}
        <Typography component="p" className="text-center">
          {title.title}
        </Typography>
      </Grid>
    );
  });
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      spacing={3}
    >
      <Grid item xs="auto">
        <h1 className="welcome-text welcome-anim text-center">Extranet</h1>
      </Grid>
      <Grid container justify="space-around" alignItems="center" spacing={3}>
        {links}
      </Grid>
    </Grid>
    // <div className="container-fluid vh-100">
    //   <div className="col w-100 h-50 ">
    //     <h1 className="welcome-text welcome-anim text-center">Extranet</h1>
    //   </div>
    //   <div className="col d-flex flex-column justify-self-sm-center h-50">
    //     <div
    //       style={{ position: "relative", top: "50px" }}
    //       className="border-top d-none d-md-flex flex-md-row w-100 hr-anim"
    //     />
    //     <ul className="d-flex flex-column flex-md-row justify-content-between">
    //       {links}
    //     </ul>
    //   </div>
    // </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getAllNews }
)(Dashboard);
