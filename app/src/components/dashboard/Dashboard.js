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
  },
  links: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
      textAlign: "center"
    }
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
        key={id}
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20
        }}
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
              <Typography variant="h5" component="h3" className="welcome-anim">
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
              <Typography variant="h5" component="h3" className=" welcome-anim">
                {title.icon}
              </Typography>
            </Paper>
          </a>
        )}
        <Typography className={classes.links} component="p">
          {title.title}
        </Typography>
      </Grid>
    );
  });
  return (
    <Grid container justify="center" alignItems="center" direction="column">
      <Grid item xs>
        <h1 className="welcome-text welcome-anim text-center">Extranet</h1>
      </Grid>
      <Grid container justify="space-between" alignItems="center">
        {links}
      </Grid>
    </Grid>
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
