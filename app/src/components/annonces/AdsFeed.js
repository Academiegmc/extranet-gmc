import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {
  Grid,
  makeStyles,
  Card,
  Typography,
  CardActions,
  CardContent,
  Button
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  gridItem: {
    margin: 20,
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "400px",
      height: "100%"
    }
  }
}));

const AdsFeed = ({ ads: { ads } }) => {
  const classes = useStyles();
  const [disallowedTypes, setDisallowedTypes] = useState([
    "image",
    "html",
    "inlineCode",
    "code"
  ]);
  let showAds;
  if (ads.length > 0) {
    showAds = ads.map(annonce => (
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
  } else {
    showAds = (
      <Grid className={classes.gridItem} item>
        <Typography variant="h5" component="h5">
          Les annonces vont bientôt tomber !
        </Typography>
      </Grid>
    );
  }
  return showAds;
};

AdsFeed.propTypes = {
  ads: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  ads: state.ads
});
export default connect(
  mapStateToProps,
  null
)(AdsFeed);
