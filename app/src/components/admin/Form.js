import React, { useState, useEffect, useRef, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import bsCustomFileInput from "bs-custom-file-input";
import imageCompression from "browser-image-compression";
import {
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

import { getANews, updateNews } from "../../actions/newsActions";
import { logout } from "../../actions/authActions";
import { createAd, updateAd, getAnAd } from "../../actions/adAction";
import ReturnButton from "../layout/ReturnButton";
import Loading from "../layout/Loading";

import "react-toastify/dist/ReactToastify.css";
import "./Form.css";

toast.configure();

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
  const [errorFields, setErrorFields] = useState(null);

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
        toast("Veuillez uploader une photo !", {
          type: "error"
        });
      }
    });
    setImages(resTab);
  };
  const onSubmit = async e => {
    e.preventDefault();
    let formErrors = [];
    if (match.path === "/admin/annonce") {
      if (title === "" || description === "") {
        formErrors.push("title", "description");
        setErrorFields(formErrors);
        toast("Veuillez remplir les deux champs !", {
          type: "error"
        });
      }
      if (formErrors.length === 0) {
        const newAd = {
          title,
          description,
          category,
          images
        };
        const { status } = await createAd(newAd);
        if (status === "success") {
          toast("L'annonce a été créée avec succès !", { type: "success" });
          setTitle("");
          setDescription("");
          setCategory("");
          setImages(null);
        } else {
          toast("Une erreur est survenue lors de la création de l'annonce !", {
            type: "error"
          });
        }
      }
    }
    if (match.path === "/annonce/edit/:id") {
      const { status } = updateAd(match.params.id, {
        title,
        description,
        category
      });
      if (status === "success") {
        toast("L'annonce a été modifiée avec succès !", { type: "success" });
        setTitle("");
        setDescription("");
        setCategory("");
      } else {
        toast(
          "Une erreur est survenue lors de la modification de l'annonce !",
          {
            type: "error"
          }
        );
      }
    }
  };
  // if (errors.status === 403) logout();
  if (loading) loading = <Loading />;
  else loading = null;
  return (
    <div className={classes.root}>
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
            {errorFields &&
            (errorFields.includes("title") ||
              errorFields.includes("description")) ? (
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
            {errorFields && errorFields.includes("image") ? (
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
                {title === "" && description === "" ? (
                  <Button
                    className={classes.btn}
                    variant="contained"
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
