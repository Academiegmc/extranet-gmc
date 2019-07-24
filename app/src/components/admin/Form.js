import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import bsCustomFileInput from "bs-custom-file-input";
import imageCompression from "browser-image-compression";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import "./Form.css";
import { createNews, getANews, updateNews } from "../../actions/newsActions";
import { logout } from "../../actions/authActions";
import { createAd, updateAd, getAnAd } from "../../actions/adAction";
import ReturnButton from "../layout/ReturnButton";
import Loading from "../layout/Loading";
import { Grid, Button, makeStyles } from "@material-ui/core";

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

const Form = ({
  createAd,
  match,
  loading,
  history,
  errors,
  ads,
  formTitle,
  titleInputName,
  titleInputPlaceholder,
  titleInputAria,
  descriptionInputName,
  descriptionInputPlaceholder,
  descriptionInputAria,
  isNews
}) => {
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("etude");
  const [images, setImages] = useState(null);
  const [triggerShadowEvent, setTriggerShadowEvent] = useState(false);
  useEffect(() => {
    bsCustomFileInput.init();
    if (match.path === "/annonce/edit/:id") {
      getAnAd(match.params.id);
    }
  }, []);
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     title: "",
  //     description: "",
  //     category: "etude",
  //     images: [],
  //     errors: {},
  //     loading: false,
  //     triggerShadowEvent: false
  //   };
  //   this.handleImageUpload = this.handleImageUpload.bind(this);
  //   this.onChange = this.onChange.bind(this);
  //   this.onSubmit = this.onSubmit.bind(this);
  //   this.triggerShadow = this.triggerShadow.bind(this);
  // }
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
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) this.setState({ errors: nextProps.errors });
  //   if (nextProps.ads.ad.data) {
  //     this.setState({ title: nextProps.ads.ad.data.title });
  //     this.setState({ description: nextProps.ads.ad.data.description });
  //     this.setState({ category: nextProps.ads.ad.data.category });
  //   }
  //   if (nextProps.news.news.data) {
  //     this.setState({ title: nextProps.news.news.data.title });
  //     this.setState({ description: nextProps.news.news.data.description });
  //     this.setState({ category: nextProps.news.news.data.category });
  //   }
  // }
  // componentDidMount() {
  //   bsCustomFileInput.init();
  // if (this.props.match.path === "/annonce/edit/:id") {
  //   this.props.getAnAd(this.props.match.params.id);
  // }
  //   if (this.props.match.path === "/news/edit/:id") {
  //     this.props.getANews(this.props.match.params.id);
  //   }
  // }
  // triggerShadow(e) {
  //   this.setState({ triggerShadowEvent: !this.state.triggerShadowEvent });
  // }
  const onSubmit = e => {
    e.preventDefault();
    const newAd = {
      title,
      description,
      category,
      images
    };
    createAd(newAd, history);
    // if (match.path === "/admin/news") {
    //   createNews({ images, description, title }, history);
    // }
    // if (match.path === "/news/edit/:id") {
    //   updateNews(
    //     match.params.id,
    //     { images, description, title, images },
    //     history
    //   );
    // }
    // if (match.path === "/admin/annonce") {
    //   const newAd = {
    //     title,
    //     description,
    //     category,
    //     images
    //   };
    //   createAd(newAd, history);
    // }
    // if (match.path === "/annonce/edit/:id") {
    //   updateAd(match.params.id, { title, description, category }, history);
    // }
  };
  if (errors.status === 403) logout();
  let updateBtn;
  let createBtn;
  let btnClass = "btn btn-primary w-100 mt-3";
  if (loading) {
    updateBtn = (
      <button className={btnClass} disabled>
        Modifier la news
      </button>
    );
    createBtn = (
      <button className={btnClass} disabled>
        Ajouter la news
      </button>
    );
  } else {
    updateBtn = <button className={btnClass}>Modifier la news</button>;
    createBtn = <button className={btnClass}>Ajouter la news</button>;
  }
  if (loading) loading = <Loading />;
  else loading = null;
  return (
    <div className="container">
      <ReturnButton history={history} />
      <form
        className="flex-column flex-center card rounded form-shadow fade show p-5"
        onSubmit={onSubmit}
        onMouseEnter={() => setTriggerShadowEvent(!triggerShadowEvent)}
        onMouseLeave={() => setTriggerShadowEvent(!triggerShadowEvent)}
      >
        <h5 className="text-center">{formTitle}</h5>
        <div className="form-group-text">
          <label htmlFor={titleInputName}>Titre</label>
          <input
            type="text"
            className="form-control"
            id={titleInputName}
            name={titleInputName}
            aria-describedby={titleInputAria}
            placeholder={titleInputPlaceholder}
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <div className="form-group-textarea">
          <label htmlFor={descriptionInputName}>Description</label>
          <textarea
            className="form-control"
            style={{ whiteSpace: "pre-wrap" }}
            id={descriptionInputName}
            name={descriptionInputName}
            aria-describedby={descriptionInputAria}
            placeholder={descriptionInputPlaceholder}
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
        </div>
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

        {isNews ? (
          <div className="input-group mt-3 mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupFileAddon01">
                <i className="fas fa-file-pdf" />
              </span>
            </div>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                accept="image/*"
                id="images"
                name="images"
                multiple
                onChange={handleImageUpload}
              />
              <label
                className="custom-file-label"
                data-browse="Parcourir"
                htmlFor="images"
              >
                Illustrez vos propos avec des images
              </label>
              <small>Types de fichiers autorisés: .jpg .png.</small>
              <small>Taille maximum : 2Mo.</small>
            </div>
            {match.path === "/news/edit/:id" ? updateBtn : createBtn}
          </div>
        ) : (
          <div className="form-group-select">
            <label htmlFor="category">Catégorie</label>
            <select
              className="form-control"
              id="category"
              name="category"
              aria-describedby="categoryHelp"
              placeholder="Type de contrat"
              onChange={e => setCategory(e.target.value)}
              value={category}
            >
              <option value="etude">Etude</option>
              <option value="loisir">Loisir</option>
              <option value="cosmetique">Cosmétique</option>
            </select>
            {match.path === "/annonce/edit/:id" ? (
              <button className="btn btn-primary" style={{ width: "100%" }}>
                Modifier l'annonce
              </button>
            ) : (
              <button
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "2%" }}
              >
                Ajouter l'annonce
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
};
Form.propTypes = {
  news: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  ads: PropTypes.object.isRequired,

  createAd: PropTypes.func.isRequired,
  getAnAd: PropTypes.func.isRequired,
  getANews: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  updateNews: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  news: state.news,
  auth: state.auth,
  errors: state.errors,
  ads: state.ads
});
export default connect(
  mapStateToProps,
  { createAd, getAnAd, getANews, logout, updateNews }
)(withRouter(Form));
