import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  makeStyles,
  Card,
  Typography,
  CardActions,
  CardContent,
  Button,
  TextField
} from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import { getAllAds, searchAd } from "../../actions/adAction";
import "./Annonces.css";

// import Button from "../layout/Button";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(2)
    }
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  },
  button: { backgroundColor: "#c9b8b7", color: "#fff" },
  control: {
    margin: "0px 5px"
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row"
    }
  },
  gridItem: {
    margin: 20
  }
}));

const Annonces = ({ ads, searchAd, getAllAds }) => {
  const [value, setValue] = useState("");
  const [disallowedTypes, setDisallowedTypes] = useState([
    "image",
    "html",
    "inlineCode",
    "code"
  ]);
  const classes = useStyles();
  useEffect(() => {
    getAllAds();
  }, []);

  if (ads.ads === null) {
    return <h3>Chargement...</h3>;
  }
  let allAnnonces;
  console.log(ads.ads);
  if (ads.ads.length > 0) {
    allAnnonces = ads.ads.map(annonce => (
      <Grid className={classes.gridItem} item xs={12} key={annonce.id}>
        <Card>
          {/* <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          /> */}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {annonce.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <ReactMarkdown
                source={annonce.description}
                disallowedTypes={disallowedTypes}
                linkTarget={"_blank"}
              />
            </Typography>
          </CardContent>

          <CardActions>
            <RouterLink to={`/annonce/${annonce.id}`}>
              <Button size="small" color="primary">
                Lire l'article
              </Button>
            </RouterLink>
          </CardActions>
        </Card>
      </Grid>
    ));
  }

  return (
    <div className={classes.root}>
      <Grid container className={classes.grid}>
        <Grid className={classes.paper} item xs={12} sm={3}>
          <Typography variant="h5" component="h5">
            Rechercher une annonce
          </Typography>
          <Grid item xs={12}>
            <TextField
              id="standard-name"
              label="Annonce"
              className={classes.textField}
              value={value}
              onChange={e => {
                setValue(e.target.value);
                searchAd(e.target.value);
              }}
              margin="normal"
            />
          </Grid>
          <Grid
            container
            item
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <Grid item xs="auto" className={classes.control}>
              <Button className={classes.button} onClick={() => alert("Etude")}>
                Etude
              </Button>
            </Grid>
            <Grid item xs="auto" className={classes.control}>
              <Button
                className={classes.button}
                onClick={() => alert("Cosmétique")}
              >
                Cosmétique
              </Button>
            </Grid>
            <Grid item xs="auto" className={classes.control}>
              <Button
                className={classes.button}
                onClick={() => alert("Emplois")}
              >
                Emplois
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.grid} container item xs={12} sm={9}>
          {allAnnonces}
        </Grid>
      </Grid>
    </div>
  );
};

Annonces.propTypes = {
  ads: PropTypes.object.isRequired,
  getAllAds: PropTypes.func.isRequired,
  searchAd: PropTypes.func.isRequired
};
const mapStatetoProps = state => ({
  ads: state.ads
});
export default connect(
  mapStatetoProps,
  { getAllAds, searchAd }
)(Annonces);
