import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  makeStyles,
  Container,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardActions,
  CardContent,
  Button
} from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import ReactAutocomplete from "react-autocomplete";
import { getAllAds, searchAd } from "../../actions/adAction";
import "./Annonces.css";

// import Button from "../layout/Button";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
  }
}));

const Annonces = ({ ads, searchAd, getAllAds, history }) => {
  const [annonces, setAnnonces] = useState([]);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState("");
  const [ad_chose, setAd_chose] = useState({});
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
      <Card key={annonce.id}>
        <CardActionArea>
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
    ));
  }

  return (
    <Container fixed>
      <Grid className={classes.root} container spacing={7}>
        <Grid container direction="column" item xs={4}>
          <Grid item>
            <ReactAutocomplete
              className="form-control"
              items={items}
              shouldItemRender={(item, value) =>
                item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
              }
              getItemValue={item => item.title}
              renderItem={(item, highlighted) => (
                <div
                  key={item._id}
                  style={{
                    backgroundColor: highlighted ? "#eee" : "transparent"
                  }}
                >
                  <p onClick={() => setItems(item)}>{item.title}</p>
                </div>
              )}
              renderInput={props => (
                <input
                  {...props}
                  role="combobox"
                  name="search"
                  className="form-control"
                  value={value}
                />
              )}
              value={value}
              onChange={e => {
                setValue(e.target.value);
                searchAd(e.target.value);
                if (value === "") setItems([]);
              }}
              onSelect={(value, item) => {
                setValue(value);
                setItems(item);
              }}
              wrapperStyle={{ display: "inline-block", width: "40%" }}
            />
          </Grid>
          <Grid item>
            <Button onClick={() => alert("Etude")}>Etude</Button>
          </Grid>
          <Grid item>
            <Button onClick={() => alert("Cosmétique")}>Cosmétique</Button>
          </Grid>
          <Grid item>
            <Button onClick={() => alert("Emplois")}>Emplois</Button>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          {allAnnonces}
        </Grid>
        {/* <Grid item xs={3}>
          FORM
        </Grid> */}
      </Grid>
    </Container>
    // <div className="container-fluid h-100">
    //   <div className="mx-3 row d-flex flex-column">
    //     <ReturnButton history={history} />
    //     <h1>Annonces</h1>
    //   </div>

    //   <div className="row mx-3 mb-3">
    //     <div className="input-group">
    //       <span className="input-group-text" id="basic-addon1">
    //         <i className="fas fa-newspaper"> </i>
    //       </span>
    //       <ReactAutocomplete
    //         className="form-control"
    //         items={items}
    //         shouldItemRender={(item, value) =>
    //           item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
    //         }
    //         getItemValue={item => item.title}
    //         renderItem={(item, highlighted) => (
    //           <div
    //             key={item._id}
    //             style={{
    //               backgroundColor: highlighted ? "#eee" : "transparent"
    //             }}
    //           >
    //             <p onClick={() => setAd_chose(item)}>{item.title}</p>
    //           </div>
    //         )}
    //         renderInput={props => (
    //           <input
    //             {...props}
    //             role="combobox"
    //             name="search"
    //             className="form-control"
    //           />
    //         )}
    //         value={value}
    //         onChange={e => {
    //           searchAd(e.target.value);
    //           if (value === "") setAd_chose({});
    //         }}
    //         onSelect={(value, item) => {
    //           setValue(value);
    //           setAd_chose(item);
    //         }}
    //         wrapperStyle={{ display: "inline-block", width: "40%" }}
    //       />
    //       <Link to={`/annonce/${ad_chose._id}`} className="btn btn-primary">
    //         <i className="fas fa-search"> </i>
    //       </Link>
    //     </div>
    //   </div>
    //   <div className="d-flex flex-column flex-md-row flex-md-wrap mt-5">
    //     {allAnnonces}
    //   </div>
    // </div>
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
