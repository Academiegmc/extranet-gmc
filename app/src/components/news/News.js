import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import Moment from "react-moment";
import Slider from "react-slick";
import ReactMarkdown from "react-markdown";
import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Button,
  Typography,
  makeStyles,
  Grid,
  Container,
  Divider,
  Link
} from "@material-ui/core";
import Clock from "react-live-clock";
import { getAllNews } from "../../actions/newsActions";
import ReturnButton from "../layout/ReturnButton";
import settings from "./newsCarouselConfig";
import "./News.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Today } from "@material-ui/icons";

const useStyles = makeStyles({
  card: {
    maxWidth: "100%",
    marginTop: "20px"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  media: {
    height: 200
  },
  mediaHeader: {
    height: 75,
    width: 75,
    borderRadius: "50%"
  }
});

const News = ({ news, auth: { user }, history, getAllNews, loading }) => {
  let status;
  const [disallowedTypes, setDisallowedTypes] = useState([
    "image",
    "html",
    "inlineCode",
    "code"
  ]);
  const classes = useStyles();

  useEffect(() => {
    getAllNews();
  }, []);
  let imgNews;
  if (loading || news.newsTab === null || user === null) {
    return <h2>Chargement...</h2>;
  }
  const allNews = news.newsTab.data.map((news, index) => {
    console.log(news.images);
    if (news.images.length > 0) {
      imgNews = news.images.map((img, i) => (
        <CardMedia
          className={classes.media}
          image={`http://${
            process.env.REACT_APP_NODE_API
          }/api/news/image/${img}`}
          title={`Card image cap ` + i}
          key={i}
        />
        // <div key={i}>
        //   <img
        //     className="card-img-top"
        //     src={`http://${
        //       process.env.REACT_APP_NODE_API
        //     }/api/news/image/${img}`}
        //     alt={`Card image cap ` + i}
        //   />
        // </div>
      ));
    }
    // if(user.status === 0) status = 'élève';
    switch (user.status) {
      case 0:
        status = "élève";
      case 1:
        status = "Ancien élève";
      case 2:
        status = "Professeur";
      case 3:
        status = "Administrateur";
      default:
        break;
    }
    return (
      <Card className={classes.card} key={news.id}>
        <CardActionArea>
          {news.images.length > 0 ? (
            <Slider {...settings}>{imgNews}</Slider>
          ) : null}
          {/* <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          /> */}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {news.title}
            </Typography>
            <Divider />
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              component="p"
            >
              <ReactMarkdown
                source={news.description}
                disallowedTypes={disallowedTypes}
                linkTarget={"_blank"}
              />
            </Typography>
            <Divider style={{ marginBottom: "20px" }} />
            <Typography variant="body2" color="textSecondary" component="p">
              <small
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "30%"
                }}
              >
                <Today />
                {"  "}
                {
                  <Moment format="DD MMM, YYYY" locale="fr">
                    {news.date}
                  </Moment>
                }
              </small>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
  });
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent className={classes.cardHeader}>
                <CardMedia
                  className={classes.mediaHeader}
                  image={`http://${
                    process.env.REACT_APP_NODE_API
                  }/api/users/image/${user.profile_pic}`}
                  title="Contemplative Reptile"
                />
                <Typography variant="body2" component="h3">
                  {user.name}
                </Typography>
                <Typography variant="caption" component="h5" display="block">
                  {status}
                </Typography>
                <Divider />
                <Typography variant="body2" component="h3">
                  <RouterLink to={`profile/${user.id}`}>
                    <Link component="button" varian="body2">
                      Voir mon profil
                    </Link>
                  </RouterLink>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent>
                <Typography variant="body2" component="h3">
                  Les news vont tomber !
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          {allNews.length > 0 ? (
            allNews
          ) : (
            <Typography variant="body2" component="h3">
              Les news vont tomber !
            </Typography>
          )}
        </Grid>
        <Grid item xs={3}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent className={classes.cardHeader}>
                <Typography variant="h4">
                  {<Moment format="DD/MM/YY">{Date.now()}</Moment>}
                </Typography>
                <Typography variant="h5" display="block">
                  {
                    <Clock
                      format={"HH:mm:ss"}
                      ticking={true}
                      timezone={"Europe/Paris"}
                    />
                  }
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
    // <div className="container">
    //   <ReturnButton history={history} />
    //   <h2>
    //     <span>Dernières News</span>
    //   </h2>
    //   <div className="d-flex flex-column W-100">
    //     {allNews.length > 0 ? (
    //       allNews
    //     ) : (
    //       <h3 className="text-center my-5">Les news vont tomber !</h3>
    //     )}
    //   </div>
    // </div>
  );
};
News.propTypes = {
  news: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  news: state.news,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getAllNews }
)(News);
