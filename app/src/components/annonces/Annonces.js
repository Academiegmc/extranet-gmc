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
import ReturnButton from "../layout/ReturnButton";
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
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     annonces: [],
  //     ads: [],
  //     items: [],
  //     disallowedTypes: ["image", "html", "inlineCode", "code"],
  //     value: "",
  //     ad_chose: {}
  //   };
  //   this.searchAds = this.searchAds.bind(this);
  // }
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.ads) {
  //     const { ads, search_ads } = nextProps.ads;
  //     if (ads.data) {
  //       this.setState({ annonces: nextProps.ads.ads.data });
  //     }
  //     if (search_ads) this.setState({ items: search_ads });
  //   }
  // }
  // componentDidMount() {
  //   this.props.getAllAds();
  // }
  // searchAds(e) {
  //   this.props.searchAd(e);
  //   this.setState({ value: e });
  // }
  let button;
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
  // ads.ads.map((annonce, index) => {
  //       let categoryIcon;
  //       let style;
  //       if (annonce.category === "etude") {
  //         categoryIcon = (
  //           <i className="fas fa-user-graduate my-auto annonce-icon" />
  //         );
  //         style = { height: "50%", backgroundColor: "#FF8962" };
  //         button = {
  //           type: "link",
  //           class: "btn btn-etude text-white rounded"
  //         };
  //       }
  //       if (annonce.category === "loisir") {
  //         categoryIcon = <i className="fas fa-dice my-auto annonce-icon" />;
  //         style = { height: "50%", backgroundColor: "#7FD1AE" };
  //         button = {
  //           type: "link",
  //           class: "btn btn-loisir text-white rounded"
  //         };
  //       }
  //       if (annonce.category === "cosmetique") {
  //         categoryIcon = <i className="fas fa-gift my-auto annonce-icon" />;
  //         style = { height: "50%", backgroundColor: "#A46855" };
  //         button = {
  //           type: "link",
  //           class: "btn btn-cosmetique text-white rounded"
  //         };
  //       }
  //       return (
  //         // <Card key={annonce.id}>
  //         //   <CardActionArea>
  //         //     <CardMedia
  //         //       component="img"
  //         //       alt="Contemplative Reptile"
  //         //       height="140"
  //         //       image="/static/images/cards/contemplative-reptile.jpg"
  //         //       title="Contemplative Reptile"
  //         //     />
  //         //     <CardContent>
  //         //       <Typography gutterBottom variant="h5" component="h2">
  //         //         Lizard
  //         //       </Typography>
  //         //       <Typography
  //         //         variant="body2"
  //         //         color="textSecondary"
  //         //         component="p"
  //         //       >
  //         //         Lizards are a widespread group of squamate reptiles, with
  //         //         over 6,000 species, ranging across all continents except
  //         //         Antarctica
  //         //       </Typography>
  //         //     </CardContent>
  //         //   </CardActionArea>
  //         //   <CardActions>
  //         //     <Button size="small" color="primary">
  //         //       Share
  //         //     </Button>
  //         //     <Button size="small" color="primary">
  //         //       Learn More
  //         //     </Button>
  //         //   </CardActions>
  //         // </Card>
  //         // <div className="card annonce-card m-2" key={index}>
  //         //   <div
  //         //     className="border card-body d-flex justify-content-center align-items-center"
  //         //     style={style}
  //         //   >
  //         //     <div className="d-flex justify-content-center align-items-center border rounded-circle bg-light annonce-card-icon">
  //         //       {categoryIcon}
  //         //     </div>
  //         //   </div>
  //         //   <div className="card-body d-flex flex-column mt-3">
  //         //     <h4 className="card-title">{annonce.title}</h4>
  //         //     <h6 className="card-subtitle text-muted mb-3">
  //         //       {annonce.user.name}
  //         //     </h6>
  //         //     {Button(
  //         //       button.type,
  //         //       button.class,
  //         //       `/annonce/${annonce.id}`,
  //         //       "En savoir plus"
  //         //     )}
  //         //   </div>
  //         // </div>
  //       );
  //     })
  //   : null;

  return (
    <Container fixed>
      <Grid className={classes.root} container spacing={7}>
        <Grid item xs={4}>
          TEST
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
