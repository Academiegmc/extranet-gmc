import React, { useState, useEffect, useRef } from "react";
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
import {
  Grid,
  Button,
  makeStyles,
  Card,
  CardHeader,
  Typography,
  CardContent,
  TextField,
  Input,
  FormControl,
  InputLabel,
  NativeSelect,
  FormHelperText
} from "@material-ui/core";
import { Fragment } from "react";
import Alert from "../layout/Alert";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "center",
    alignItems: "center"
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
  cardContent: {
    display: "flex",
    flexFlow: "column wrap"
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
    width: "100%",
    marginTop: 20,
    marginBottom: 20
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  btn: {
    padding: theme.spacing(1),
    fontFamily: "Lato",
    fontWeight: "500"
  }
}));

const Form = ({
  createAd,
  match,
  loading,
  history,
  errors,
  ads,
  news,
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
  const [labelWidth, setLabelWidth] = useState(0);
  const [alert, setAlert] = useState(null);

  let inputLabel = useRef(null);
  useEffect(() => {
    bsCustomFileInput.init();
    setLabelWidth(inputLabel.current.offsetWidth);
    if (match.path === "/annonce/edit/:id") {
      getAnAd(match.params.id);
    }
    if (match.path === "/news/edit/:id") {
      getANews(match.params.id);
    }
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
        setAlert({
          msg: "Veuillez uploader une photo !",
          type: "error",
          field: ["image"]
        });
        setTimeout(() => setAlert(null), 5000);
      }
    });
    setImages(resTab);
  };
  // triggerShadow(e) {
  //   this.setState({ triggerShadowEvent: !this.state.triggerShadowEvent });
  // }
  const onSubmit = e => {
    e.preventDefault();
    let formErrors = [];
    if (match.path === "/admin/annonce") {
      if (title === "" || description === "") {
        formErrors.push("title", "description");
        setAlert({
          msg: "Veuillez remplir les deux champs !",
          type: "error",
          field: formErrors
        });
        setTimeout(() => setAlert(null), 5000);
      }
      if (formErrors.length === 0) {
        const newAd = {
          title,
          description,
          category,
          images
        };
        console.log(newAd);
        createAd(newAd, history);
      }
    }
    if (match.path === "/annonce/edit/:id") {
      updateAd(match.params.id, { title, description, category }, history);
    }
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
    <div className={classes.root}>
      <Alert alert={alert} />
      <ReturnButton history={history} />
      <Card>
        <CardHeader
          title={
            <Typography variant="h5" component="h5">
              {formTitle}
            </Typography>
          }
        />
        <CardContent className={classes.cardContent}>
          <form
            className=""
            onSubmit={onSubmit}
            onMouseEnter={() => setTriggerShadowEvent(!triggerShadowEvent)}
            onMouseLeave={() => setTriggerShadowEvent(!triggerShadowEvent)}
          >
            {alert &&
            alert.type === "error" &&
            (alert.field.includes("title") ||
              alert.field.includes("description")) ? (
              <Fragment>
                <TextField
                  className={classes.input}
                  id={titleInputName}
                  name={titleInputName}
                  onChange={e => setTitle(e.target.value)}
                  value={title}
                  label="Titre"
                  placeholder={titleInputPlaceholder}
                  aria-describedby={titleInputAria}
                  error
                />
                <TextField
                  className={classes.input}
                  id={descriptionInputName}
                  name={descriptionInputName}
                  onChange={e => setDescription(e.target.value)}
                  value={description}
                  label="Description"
                  multiline
                  placeholder={descriptionInputPlaceholder}
                  aria-describedby={descriptionInputAria}
                  error
                />
              </Fragment>
            ) : (
              <Fragment>
                <TextField
                  className={classes.input}
                  id={titleInputName}
                  name={titleInputName}
                  onChange={e => setTitle(e.target.value)}
                  value={title}
                  label="Titre"
                  placeholder={titleInputPlaceholder}
                  aria-describedby={titleInputAria}
                />
                <TextField
                  className={classes.input}
                  id={descriptionInputName}
                  name={descriptionInputName}
                  onChange={e => setDescription(e.target.value)}
                  value={description}
                  label="Description"
                  multiline
                  placeholder={descriptionInputPlaceholder}
                  aria-describedby={descriptionInputAria}
                />
              </Fragment>
            )}
            {alert &&
            alert.type === "error" &&
            alert.field.includes("image") ? (
              <FormControl className={classes.formControl} error>
                <Input
                  type="file"
                  id="images"
                  name="images"
                  multiple
                  error
                  onChange={e => handleImageUpload(e.target.files)}
                />
                <FormHelperText id="component-error-text">
                  Le fichier n'est pas une image.
                </FormHelperText>
              </FormControl>
            ) : (
              <Input
                type="file"
                id="images"
                name="images"
                multiple
                onChange={e => handleImageUpload(e.target.files)}
              />
            )}

            {isNews ? (
              <Typography variant="body1" component="p">
                News
              </Typography>
            ) : (
              // <div className="input-group mt-3 mb-3">
              //   <div className="input-group-prepend">
              //     <span className="input-group-text" id="inputGroupFileAddon01">
              //       <i className="fas fa-file-pdf" />
              //     </span>
              //   </div>
              //   <div className="custom-file">
              //     <input
              //       type="file"
              //       className="custom-file-input"
              //       accept="image/*"
              //       id="images"
              //       name="images"
              //       multiple
              //       onChange={handleImageUpload}
              //     />
              //     <label
              //       className="custom-file-label"
              //       data-browse="Parcourir"
              //       htmlFor="images"
              //     >
              //       Illustrez vos propos avec des images
              //     </label>
              //     <small>Types de fichiers autorisés: .jpg .png.</small>
              //     <small>Taille maximum : 2Mo.</small>
              //   </div>
              //   {match.path === "/news/edit/:id" ? updateBtn : createBtn}
              // </div>
              <Fragment>
                <FormControl className={classes.input}>
                  <InputLabel ref={inputLabel} htmlFor="category">
                    Catégorie
                  </InputLabel>
                  <NativeSelect
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    input={<Input name="category" id="category" />}
                  >
                    <option value="etude">Etude</option>
                    <option value="loisir">Loisir</option>
                    <option value="cosmetique">Cosmétique</option>
                  </NativeSelect>
                </FormControl>
                {alert ? (
                  <Button
                    className={classes.btn}
                    variant="contained"
                    onClick={onSubmit}
                    fullWidth
                    disabled
                  >
                    Ajouter l'annonce
                  </Button>
                ) : (
                  <Button
                    className={classes.btn}
                    variant="contained"
                    onClick={onSubmit}
                    fullWidth
                  >
                    Ajouter l'annonce
                  </Button>
                )}
              </Fragment>
              // <div className="form-group-select">
              //   <label htmlFor="category">Catégorie</label>
              //   <select
              //     className="form-control"
              //     id="category"
              //     name="category"
              //     aria-describedby="categoryHelp"
              //     placeholder="Type de contrat"
              //     onChange={e => setCategory(e.target.value)}
              //     value={category}
              //   >
              // <option value="etude">Etude</option>
              // <option value="loisir">Loisir</option>
              // <option value="cosmetique">Cosmétique</option>
              //   </select>
              //   {match.path === "/annonce/edit/:id" ? (
              //     <button className="btn btn-primary" style={{ width: "100%" }}>
              //       Modifier l'annonce
              //     </button>
              //   ) : (
              // <button
              //   className="btn btn-primary"
              //   style={{ width: "100%", marginTop: "2%" }}
              // >
              //   Ajouter l'annonce
              // </button>
              //   )}
              // </div>
            )}
          </form>
        </CardContent>
      </Card>
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
