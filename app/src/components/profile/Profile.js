import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
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
    width: "auto"
  },
  card: {
    width: "100%"
    // marginTop: 20,
    // marginBottom: 20
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
  },
  CardHeader: {
    textAlign: "center"
  }
}));

const Profile = ({
  users,
  auth,
  loading,
  logout,
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
  let { userNews, userAds, userJobs } = users;
  let allUserAds;
  let allUserJobs;
  let allUserNews;
  const settings = {
    adaptiveHeight: true,
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  if (userAds && userAds.length > 0) {
    allUserAds = userAds.map((ad, index) => (
      <Card key={index} className={classes.wAuto}>
        <CardHeader
          className={classes.CardHeader}
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
    ));
  }
  if (userJobs && userJobs.length > 0) {
    allUserJobs = userJobs.map((job, index) => (
      <Card key={index} className={classes.wAuto}>
        <CardHeader
          className={classes.CardHeader}
          title={
            <Link to={`/job/${job.id}`}>
              <Typography variant="h5" component="h5">
                {job.jobTitle}
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
    ));
  }

  if (userNews && userNews.length > 0) {
    allUserNews = userNews.map((news, index) => (
      <Card key={index} className={classes.wAuto}>
        <CardHeader
          className={classes.CardHeader}
          title={
            <Link to={`/news/${news.id}`}>
              <Typography variant="h5" component="h5">
                {news.title}
              </Typography>
            </Link>
          }
        />
        <CardContent className={classes.cardContentBtn}>
          <Button onClick={() => deleteUserNews(news.id)}>Supprimer</Button>
        </CardContent>
      </Card>
    ));
  }
  return (
    <Container fixed>
      <ReturnButton history={history} />
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
            </div>
          </CardContent>
        </Card>
        <div style={{ width: "100%" }}>
          <h2 style={{ width: "100%", textAlign: "center" }}>Annonces</h2>
          <Slider {...settings}>{allUserAds}</Slider>
        </div>

        <div style={{ width: "100%" }}>
          <h2 style={{ width: "100%", textAlign: "center" }}>News</h2>
          <Slider {...settings}>{allUserNews}</Slider>
        </div>

        <div style={{ width: "100%" }}>
          <h2 style={{ width: "100%", textAlign: "center" }}>Jobs</h2>
          <Slider {...settings}>{allUserJobs}</Slider>
        </div>
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
    getUserAds,
    getUserJobs,
    getUserNews,
    deleteUserAds,
    deleteUserJobs,
    deleteUserNews
  }
)(Profile);
