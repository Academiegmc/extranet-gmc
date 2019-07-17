import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import Moment from "react-moment";
import Slider from "react-slick";
import ReactMarkdown from "react-markdown";
import imageCompression from "browser-image-compression";
import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Button,
  Typography,
  makeStyles,
  Grid,
  Container,
  Divider,
  Link,
  TextField,
  Hidden
} from "@material-ui/core";
import { TodayOutlined } from "@material-ui/icons";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Clock from "react-live-clock";
import { getAllNews } from "../../actions/newsActions";
import settings from "./newsCarouselConfig";
import "./News.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createNews } from "../../actions/newsActions";
import Alert from "../layout/Alert";
import ReturnButton from "../layout/ReturnButton";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  card: {
    maxWidth: "100%",
    marginTop: "20px"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    fontFamily: "Lato"
  },
  media: {
    height: 200
  },
  mediaHeader: {
    height: 75,
    width: 75,
    borderRadius: "50%"
  },
  input: {
    display: "none"
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  }
}));

const News = ({
  news,
  auth: { user },
  getAllNews,
  loading,
  createNews,
  history
}) => {
  let status;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [alert, setAlert] = useState(null);
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
  const handleImageUpload = files => {
    const imagesTab = Object.values(files);
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    let resTab = [];
    imagesTab.map(async image => {
      try {
        const compressedFile = await imageCompression(image, options);
        resTab.push(compressedFile);
      } catch (error) {
        console.error(error);
      }
    });
    setImages(resTab);
  };
  const onSubmit = e => {
    e.preventDefault();
    if (title !== "" && description !== "") {
      const newNews = {
        title,
        description,
        images
      };
      createNews(newNews);
      setTitle("");
      setDescription("");
      setImages([]);
    } else {
      setAlert({
        msg: "Veuillez entrer un titre et une description pour votre article",
        type: "error"
      });
      setTimeout(() => setAlert(null), 5000);
    }
  };
  let imgNews;
  if (loading || news.newsTab === null || user === null) {
    return <h2>Chargement...</h2>;
  }
  let allNews;
  if (news.newsTab !== undefined && news.newsTab.length > 0) {
    allNews = news.newsTab.map((news, index) => {
      if (news.images.length > 0) {
        imgNews = news.images.map((img, i) => (
          <CardMedia
            className={classes.media}
            image={`${process.env.REACT_APP_NODE_API}/api/news/image/${img}`}
            title={`Card image cap ` + i}
            key={i}
          />
        ));
      }
      switch (user.status) {
        case 0:
          status = "élève";
          break;
        case 1:
          status = "Ancien élève";
          break;
        case 2:
          status = "Professeur";
          break;
        case 3:
          status = "Administrateur";
          break;
        default:
          break;
      }
      return (
        <Card className={classes.card} key={news.id}>
          {news.images.length > 0 ? (
            <Slider {...settings}>{imgNews}</Slider>
          ) : null}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {news.title}
            </Typography>
            <Divider />
            <Typography gutterBottom variant="body2" color="textSecondary">
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
                <TodayOutlined />
                {"  "}
                {
                  <Moment format="DD MMM, YYYY" locale="fr">
                    {news.date}
                  </Moment>
                }
              </small>
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Lire l'article
            </Button>
          </CardActions>
        </Card>
      );
    });
  }
  return (
    <Container>
      <Alert alert={alert} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Card className={classes.card}>
            <CardContent className={classes.cardHeader}>
              <CardMedia
                className={classes.mediaHeader}
                image={`${process.env.REACT_APP_NODE_API}/api/users/image/${
                  user.profile_pic
                }`}
                title={user.name}
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
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
            <CardContent>
              <form onSubmit={onSubmit}>
                <Grid container direction="column">
                  <Typography variant="h5" component="h5">
                    Ajouter un article
                  </Typography>
                  <Grid item xs>
                    <Typography variant="body2" component="h3">
                      <TextField
                        placeholder="Entrer le titre de l'annonce"
                        label="Titre de l'annonce"
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        value={title}
                        onChange={e => {
                          setTitle(e.target.value);
                        }}
                        fullWidth
                      />
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body2" component="h3">
                      <TextField
                        // id="outlined-multiline-flexible"
                        label="Description de l'article"
                        multiline
                        rowsMax="4"
                        value={description}
                        onChange={e => {
                          setDescription(e.target.value);
                        }}
                        // className={classes.textField}
                        margin="normal"
                        placeholder="Entrer la description de l'article"
                        variant="outlined"
                        fullWidth
                      />
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="images"
                      name="images"
                      multiple
                      type="file"
                      onChange={e => handleImageUpload(e.target.files)}
                    />
                    <label htmlFor="images">
                      <Button variant="contained" component="span">
                        Upload
                        <CloudUploadIcon className={classes.rightIcon} />
                      </Button>
                    </label>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body2" component="h3">
                      <TextField
                        onChange={e => {
                          setDescription(e.target.value);
                        }}
                        value="Publier l'article"
                        margin="dense"
                        variant="outlined"
                        type="submit"
                        fullWidth
                      />
                    </Typography>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
          {allNews.length > 0 ? (
            allNews
          ) : (
            <Typography variant="body2" component="h3">
              Les news vont tomber !
            </Typography>
          )}
        </Grid>
        <Hidden only="xs">
          <Grid item xs={12} sm={3}>
            <Card className={classes.card}>
              <CardContent className={classes.cardHeader}>
                <Typography variant="h4">
                  {
                    <Moment format="DD MMMM YYYY" locale="fr">
                      {Date.now()}
                    </Moment>
                  }
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
                <ReturnButton history={history} />
              </CardContent>
            </Card>
          </Grid>
        </Hidden>
      </Grid>
    </Container>
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
  { getAllNews, createNews }
)(News);
