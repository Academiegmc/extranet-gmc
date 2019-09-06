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
  TextField,
  Container
} from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import { getAllAds, searchAd } from "../../actions/adAction";
import "./Annonces.css";
import Breadcrumb from "../layout/Breadcrumb";
import ReturnButton from "../layout/ReturnButton";

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
  grid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
    width: "100%",
    height: "100%",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      alignItems: "flex-start"
    }
  },
  gridItem: {
    margin: 20,
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "400px",
      height: "100%"
    }
  },
  gridAds: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    width: "100%",
    height: "100%"
  }
}));

const Annonces = ({ ads, searchAd, getAllAds, history }) => {
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
  if (ads.ads.length > 0) {
    allAnnonces = ads.ads.map(annonce => (
      <Grid className={classes.gridItem} item key={annonce.id}>
        <Card>
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
                Lire l'annonce
              </Button>
            </RouterLink>
          </CardActions>
        </Card>
      </Grid>
    ));
  }
  const links = [{ title: "Annonces", url: "/annonces" }];
  return (
    <Container className={classes.root}>
      <Breadcrumb links={links} />
      <Grid container className={classes.grid}>
        <Grid className={classes.paper} item xs={12} sm={3}>
          <ReturnButton history={history} />
          <Typography variant="h5" component="h5">
            Rechercher une annonce
          </Typography>
          <Grid item xs={12}>
            <TextField
              id="standard-name"
              label="Annonce"
              className={classes.textField}
              value={value}
              variant="outlined"
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
            direction="column"
            justify="space-around"
            alignItems="center"
          >
            <Grid item xs="auto" className={classes.control}>
              <Button
                className={classes.button}
                onClick={() => searchAd(value, "etude")}
              >
                Etude
              </Button>
            </Grid>
            <Grid item xs="auto" className={classes.control}>
              <Button
                className={classes.button}
                onClick={() => searchAd(value, "cosmetique")}
              >
                Cosmétique
              </Button>
            </Grid>
            <Grid item xs="auto" className={classes.control}>
              <Button
                className={classes.button}
                onClick={() => searchAd(value, "loisir")}
              >
                Loisir
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.gridAds} container item xs={12} sm={9}>
          {allAnnonces !== undefined && allAnnonces.length > 0 ? (
            allAnnonces
          ) : (
            <Grid className={classes.gridItem} item>
              <Typography variant="h5" component="h5">
                Les annonces vont tomber !
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
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
