import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReturnButton from "../layout/ReturnButton";
import { logout } from "../../actions/authActions";
import {
  getUserAds,
  getUserJobs,
  getUserNews,
  deleteUserAds,
  deleteUserJobs,
  deleteUserNews
} from "../../actions/usersAction";
import { deleteNews } from "../../actions/newsActions";
import { deleteJob } from "../../actions/jobActions";
import { deleteAd } from "../../actions/adAction";
import {
  Container,
  Grid,
  makeStyles,
  Card,
  CardContent,
  Divider,
  CardHeader,
  Typography,
  Button
} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  grid: {
    display: "flex",
    flexFlow: "column wrap",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      flexFlow: "row wrap"
    }
  },
  gridFlex: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      justifyContent: "flex-start",
      alignItems: "flex-start"
    }
  },
  wAuto: {
    width: "auto",
    margin: 20
  },
  card: {
    width: "100%",
    marginTop: 20,
    marginBottom: 20
  },
  cardContent: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  cardContentBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  cardLinks: {
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      flexFlow: "row wrap"
    }
  },
  links: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    cursor: "pointer",
    fontSize: "1.2rem",
    [theme.breakpoints.up("sm")]: {
      margin: "1rem",
      fontSize: "1.4rem"
    }
  }
}));

const Profile = ({
  users,
  auth,
  loading,
  logout,
  deleteNews,
  deleteAd,
  deleteJob,
  getUserAds,
  getUserJobs,
  getUserNews,
  deleteUserAds,
  deleteUserJobs,
  deleteUserNews,
  history,
  match
}) => {
  const classes = useStyles();
  useEffect(() => {
    getUserAds(auth.user.id);
    getUserJobs(auth.user.id);
    getUserNews(auth.user.id);
  }, []);
  if (loading || users === null) {
    return <h1>Chargement...</h1>;
  }
  const logoutUser = () => {
    //Rediriger l'utilisateur vers la page de login après quelques secondes en l'avertissant au préalable
    logout();
    history.push("/");
  };
  let { user, userNews, userAds, userJobs } = users;
  const updateMessage = "Modifier";
  let allUserAds;
  let allUserJobs;
  let allUserNews;
  let sessionAlert;
  if (userAds && userAds.length > 0) {
    allUserAds = userAds.map((ad, index) => (
      <Card key={index} className={classes.wAuto}>
        <CardHeader
          title={
            <Link to={`/annonce/${ad.id}`}>
              <Typography variant="h5" component="h5">
                {ad.title}
              </Typography>
            </Link>
          }
        />
        <CardContent className={classes.cardContentBtn}>
          <Link to={`/annonce/edit/${ad.id}`}>
            <Button>Modifier</Button>
          </Link>
          <Button onClick={() => deleteUserAds(ad.id)}>Supprimer</Button>
        </CardContent>
      </Card>
      // <div className="card ml-3 mb-3" style={{ width: "18rem" }} key={index}>
      //   <div className="card-body">
      //     <Link to={`/annonce/${ad.id}`}>
      //       <h5 className="card-title">{ad.title}</h5>
      //     </Link>
      //     <div className="flex-row">
      //       <button
      //         className="btn"
      //         style={{ backgroundColor: "#9F1540", color: "white" }}
      //         onClick={() => {
      //           deleteAd(ad.id);
      //         }}
      //       >
      //         Supprimer
      //       </button>
      //       <Link to={`/annonce/edit/${ad.id}`}>
      //         <button
      //           className="btn"
      //           style={{ backgroundColor: "#539356", color: "white" }}
      //         >
      //           {updateMessage}
      //         </button>
      //       </Link>
      //     </div>
      //     <small className="card-subtitle">{ad.category}</small>
      //   </div>
      // </div>
    ));
  }
  if (userJobs && userJobs.length > 0) {
    allUserJobs = userJobs.map((job, index) => (
      <Card key={index} className={classes.wAuto}>
        <CardHeader
          title={
            <Link to={`/job/${job.id}`}>
              <Typography variant="h5" component="h5">
                {job.title}
              </Typography>
            </Link>
          }
        />
        <CardContent className={classes.cardContentBtn}>
          <Link to={`/job/edit/${job.id}`}>
            <Button>Modifier</Button>
          </Link>
          <Button onClick={() => deleteUserJobs(job.id)}>Supprimer</Button>
        </CardContent>
      </Card>
      // <div className="card ml-3 mb-3" style={{ width: "18rem" }} key={index}>
      //   <div className="card-body">
      //     <Link to={`/job/${job.id}`}>
      //       <h5 className="card-title">{job.jobTitle}</h5>
      //     </Link>
      //     <div className="flex-row">
      //       <button
      //         className="btn"
      //         style={{ backgroundColor: "#9F1540", color: "white" }}
      //         onClick={() => deleteJob(job.id)}
      //       >
      //         Supprimer
      //       </button>
      //       <Link to={`/job/edit/${job.id}`}>
      //         <button
      //           className="btn"
      //           style={{ backgroundColor: "#539356", color: "white" }}
      //         >
      //           {updateMessage}
      //         </button>
      //       </Link>
      //     </div>
      //     <small className="card-subtitle">{job.jobCompany}</small>
      //   </div>
      // </div>
    ));
  }

  if (userNews && userNews.length > 0) {
    allUserNews = userNews.map((news, index) => (
      <Card key={index} className={classes.wAuto}>
        <CardHeader
          title={
            <Link to={`/news/${news.id}`}>
              <Typography variant="h5" component="h5">
                {news.title}
              </Typography>
            </Link>
          }
        />
        <CardContent className={classes.cardContentBtn}>
          <Link to={`/news/edit/${news.id}`}>
            <Button>Modifier</Button>
          </Link>
          <Button onClick={() => deleteUserNews(news.id)}>Supprimer</Button>
        </CardContent>
      </Card>
      // <div className="card ml-3 mb-3" style={{ width: "18rem" }} key={index}>
      //   <div className="card-body">
      //     <Link to={`/news/${aNews.id}`}>
      //       <h5 className="card-title">{aNews.title}</h5>
      //     </Link>
      //     <div className=" flex-row">
      //       <button
      //         className="btn"
      //         style={{ backgroundColor: "#9F1540", color: "white" }}
      //         onClick={() => {
      //           deleteNews(aNews.id);
      //         }}
      //       >
      //         Supprimer
      //       </button>
      //       <Link to={`/news/edit/${aNews.id}`}>
      //         <button
      //           className="btn"
      //           style={{ backgroundColor: "#539356", color: "white" }}
      //         >
      //           {updateMessage}
      //         </button>
      //       </Link>
      //     </div>
      //     <small className="card-subtitle">{aNews.name}</small>
      //   </div>
      // </div>
    ));
  }
  return (
    <Container fixed>
      <Grid className={classes.grid} container item xs={12}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <div className={classes.cardLinks}>
              <Link
                className={classes.links}
                to={`/profile/edit/${match.params.id}`}
              >
                Mon profil
              </Link>
              <Link className={classes.links} to="/markdown">
                Documentation
              </Link>
              <Link className={classes.links} to="/admin/job">
                Ajouter un job
              </Link>
              <Link className={classes.links} to="/admin/annonce">
                Ajouter une annonce
              </Link>
              <Link className={classes.links} to="/admin/news">
                Ajouter une news
              </Link>
            </div>
          </CardContent>
        </Card>
        <h2 style={{ width: "100%", textAlign: "center" }}>Annonces</h2>
        <div className={classes.gridFlex}>{allUserAds}</div>
        <Divider style={{ width: "100%" }} />
        <h2 style={{ width: "100%", textAlign: "center" }}>News</h2>
        <div className={classes.gridFlex}>{allUserNews}</div>
        <Divider style={{ width: "100%" }} />
        <h2 style={{ width: "100%", textAlign: "center" }}>Jobs</h2>
        <div className={classes.gridFlex}>{allUserJobs}</div>
      </Grid>
    </Container>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  deleteUserAds: PropTypes.func.isRequired,
  deleteUserJobs: PropTypes.func.isRequired,
  deleteUserNews: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  deleteNews: PropTypes.func.isRequired,
  deleteAd: PropTypes.func.isRequired,
  deleteJob: PropTypes.func.isRequired,
  getUserAds: PropTypes.func.isRequired,
  getUserJobs: PropTypes.func.isRequired,
  getUserNews: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  {
    logout,
    deleteNews,
    deleteAd,
    deleteJob,
    getUserAds,
    getUserJobs,
    getUserNews,
    deleteUserAds,
    deleteUserJobs,
    deleteUserNews
  }
)(Profile);
