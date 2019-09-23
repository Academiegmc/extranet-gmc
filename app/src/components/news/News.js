import React, {
  useEffect,
  useState,
  lazy,
  Suspense,
  useLayoutEffect
} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import Moment from "react-moment";
import imageCompression from "browser-image-compression";
import {
  Card,
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
  Hidden,
  Input,
  CircularProgress
} from "@material-ui/core";
import Clock from "react-live-clock";
import { getAllNews } from "../../actions/newsActions";
import "./News.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createNews } from "../../actions/newsActions";
import ReturnButton from "../layout/ReturnButton";
import Breadcrumb from "../layout/Breadcrumb";
import { updateNewsComments } from "../../actions/newsActions";
import NewsCard from "./NewsCard";
import { apiUrl } from "../../utils";
import Face from "../../assets/face.png";
import NewsContainer from "./NewsContainer";

toast.configure();

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
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
      width: "100%"
    }
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  grid: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  progress: {
    margin: theme.spacing(2)
  },
  overflow: {
    overflowY: "scroll"
  }
}));

const News = ({
  news: { newsTab },
  auth,
  getAllNews,
  loading,
  createNews,
  history,
  match,
  updateNewsComments
}) => {
  const { user } = auth;
  let status;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  let count = 1;
  const classes = useStyles();
  // useEffect(() => {
  //   getAllNews(page);
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);
  // useLayoutEffect(() => {
  //   if (!isFetching) return;
  //   setTimeout(() => {
  //     setPage(page + 1);
  //     getAllNews(page + 1);
  //     console.log({ page: page + 1, isFetching });
  //     setIsFetching(false);
  //   }, 4000);
  // }, [isFetching]);
  const handleScroll = e => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = Math.round(windowHeight + window.pageYOffset);
    if (windowBottom >= docHeight) {
      // count = count + 1;
      // setPage(page + 1);
      setIsFetching(true);
      console.log("Fetch more news");
    }
  };
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
      toast("Veuillez entrer un titre et une description pour votre article", {
        type: "error"
      });
    }
  };
  let imgNews;
  if (loading || user === null) {
    return (
      <div className={classes.grid}>
        <CircularProgress className={classes.progress} />
      </div>
    );
  }
  let allNews;
  // if (newsTab !== undefined && newsTab.length > 0) {
  //   allNews = newsTab.map(news => {
  //     if (news.images.length > 0) {
  //       imgNews = news.images.map((img, i) => (
  //         <CardMedia
  //           className={classes.media}
  //           image={`${apiUrl}/api/news/image/news/${img}`}
  //           title={`Card image cap ` + i}
  //           key={i}
  //         />
  //       ));
  //     }
  //     switch (user.status) {
  //       case 0:
  //         status = "élève";
  //         break;
  //       case 1:
  //         status = "Ancien élève";
  //         break;
  //       case 2:
  //         status = "Professeur";
  //         break;
  //       case 3:
  //         status = "Administrateur";
  //         break;
  //       default:
  //         break;
  //     }
  //     return (
  //       <NewsCard
  //         key={news.id}
  //         news={news}
  //         auth={auth}
  //         match={match}
  //         updateNewsComments={updateNewsComments}
  //         imgNews={imgNews}
  //       />
  //     );
  //   });
  // }
  const links = [{ title: "News", url: "/news" }];
  const LazyNews = lazy(() => import("./NewsFeed"));
  return (
    <Container>
      <Breadcrumb links={links} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Card className={classes.card}>
            <CardContent className={classes.cardHeader}>
              <CardMedia
                className={classes.mediaHeader}
                image={
                  user.profile_pic
                    ? `${apiUrl}/api/users/image/${user.profile_pic}`
                    : Face
                }
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
                        placeholder="Entrer le titre de l'article"
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
                        label="Description de l'article"
                        multiline
                        rowsMax="4"
                        value={description}
                        onChange={e => {
                          setDescription(e.target.value);
                        }}
                        margin="normal"
                        placeholder="Entrer la description de l'article"
                        variant="outlined"
                        fullWidth
                      />
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Input
                      accept="image/*"
                      className={classes.input}
                      id="images"
                      name="images"
                      multiple
                      type="file"
                      onChange={e => handleImageUpload(e.target.files)}
                    />
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
          <NewsContainer />
          {/* <div className={classes.overflow} onScroll={handleScroll}> */}
          {/* <Suspense
            fallback={
              <div className={classes.grid}>
                <CircularProgress className={classes.progress} />
              </div>
            }
          >
            <LazyNews />
          </Suspense>
          {isFetching && "Chargement des news..."} */}
          {/* </div> */}
          {/* {allNews !== undefined && allNews.length > 0 ? (
            allNews
          ) : (
            <Typography variant="body2" component="h3">
              Les news vont bientôt tomber !
            </Typography>
          )} */}
        </Grid>
        <Hidden only="xs">
          <Grid item xs={12} sm={3}>
            <Card className={classes.card}>
              <CardContent className={classes.cardHeader}>
                <Typography variant="h5">
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
  { getAllNews, createNews, updateNewsComments }
)(News);
