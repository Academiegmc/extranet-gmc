import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import imageCompression from "browser-image-compression";
import bsCustomFileInput from "bs-custom-file-input";
import { toast } from "react-toastify";
import {
  Container,
  Grid,
  makeStyles,
  Card,
  CardContent,
  TextField,
  CardHeader,
  Typography,
  Button,
  Input,
  Divider,
  InputLabel,
  FormControl
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import "moment/locale/fr";
import Alert from "../layout/Alert";
import { updateUser, getUser } from "../../actions/usersAction";
import ReturnButton from "../layout/ReturnButton";
import "react-toastify/dist/ReactToastify.css";
import "./Profile.css";

toast.configure();

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexFlow: "column wrap",
    width: "100%",
    height: "100%",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  card: {
    marginTop: 20,
    marginBottom: 20
  },
  cardContent: {
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      flexFlow: "row wrap",
      justifyContent: "space-between",
      alignItems: "center"
    }
  },
  textField: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10
  },
  btn: {
    width: "100%"
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  divider: {
    marginTop: 20,
    marginBottom: 20
  }
}));
const ProfileForm = ({
  auth,
  users,
  errors,
  loading,
  history,
  match,
  getUser,
  updateUser
}) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [poste, setPoste] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStart_date] = useState(null);
  const [end_date, setEnd_date] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ficheRenseignement, setFicheRenseignement] = useState(null);
  const [conventionStage, setConventionStage] = useState(null);
  const [lettreRecommandation, setLettreRecommandation] = useState("");
  const [author, setAuthor] = useState("");
  const [alert, setAlert] = useState(null);
  const [errorFields, setErrorFields] = useState(null);
  useEffect(() => {
    bsCustomFileInput.init();
    getUser(match.params.id);
  }, []);
  const handleImageUpload = async () => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    try {
      let compressedFile;
      if (profilePic !== null) {
        compressedFile = await imageCompression(profilePic, options);
        console.log({ compressedFile });
        setProfilePic(compressedFile);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const checkPassword = (pass, new_pass, confirm_pass) => {
    if (pass === "" && (new_pass !== "" || confirm_pass !== "")) {
      toast("Veuillez entrer un mot de passe.", {
        type: "error"
      });
    } else {
      if (new_pass !== confirm_pass) {
        toast("Vos mots de passe ne correspondent pas.", {
          type: "error"
        });
        return;
      }
    }
  };
  const checkRecommandation = (rec_text, rec_author) => {
    let errorTab = [];
    if (rec_text === "" && rec_author !== "") errorTab.push("rec_text");
    if (rec_text !== "" && rec_author === "") errorTab.push("rec_author");
    if (errorTab.length > 0) {
      setErrorFields(errorTab);
      toast("Veuillez remplir les deux champs de recommandation.", {
        type: "error"
      });
      return;
    }
  };
  const checkExperience = (
    comp_name,
    comp_job_name,
    comp_desc,
    comp_start_date,
    comp_end_date
  ) => {
    let errorTab = [];
    if (
      comp_name === "" &&
      (comp_desc !== "" ||
        comp_job_name !== "" ||
        comp_start_date !== null ||
        comp_end_date !== null)
    ) {
      errorTab.push("company_name");
    }
    if (
      comp_desc === "" &&
      (comp_name !== "" ||
        comp_job_name !== "" ||
        comp_start_date !== null ||
        comp_end_date !== null)
    ) {
      errorTab.push("company_description");
    }
    if (
      comp_job_name === "" &&
      (comp_name !== "" ||
        comp_desc !== "" ||
        comp_start_date !== null ||
        comp_end_date !== null)
    ) {
      errorTab.push("company_job_name");
    }
    if (
      comp_start_date === null &&
      (comp_name !== "" ||
        comp_desc !== "" ||
        comp_job_name !== "" ||
        comp_end_date !== null)
    ) {
      errorTab.push("company_start_date");
    }
    if (
      comp_end_date === null &&
      (comp_name !== "" ||
        comp_desc !== "" ||
        comp_job_name !== "" ||
        comp_start_date !== null)
    ) {
      errorTab.push("company_end_date");
    }
    if (errorTab.length > 0) {
      setErrorFields(errorTab);
      toast("Veuillez corriger les informations rentrées dans le formulaire.", {
        type: "error"
      });
      return;
    }
  };
  const onSubmit = async e => {
    e.preventDefault();
    await handleImageUpload();
    checkPassword(oldPassword, newPassword, confirmPassword);
    checkRecommandation(lettreRecommandation, author);
    checkExperience(name, poste, description, start_date, end_date);
    const data = {
      company_name: name,
      poste,
      description,
      start_date,
      end_date,
      profile_pic: profilePic,
      old_password: oldPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
      fiche_renseignement: ficheRenseignement,
      convention_stage: conventionStage,
      lettre_recommandation: lettreRecommandation,
      author
    };
    if (errorFields === null || errorFields.length === 0) {
      const { status } = await updateUser(data);
      if (status === "success") {
        toast("Vos informations ont été modifiées !", {
          type: "success"
        });
      } else {
        toast(
          "Une erreur est survenue lors de la modification de votre profil.",
          {
            type: "error"
          }
        );
      }
      setAuthor("");
      setName("");
      setPoste("");
      setConfirmPassword("");
      setNewPassword("");
      setOldPassword("");
      setLettreRecommandation("");
      setConventionStage(null);
      setFicheRenseignement(null);
      setStart_date(null);
      setEnd_date(null);
    }
  };
  if (loading || users === null) {
    return <h3>Chargement...</h3>;
  }
  return (
    <Container fixed>
      <Alert alert={alert} setAlert={setAlert} />
      <ReturnButton history={history} />
      <Grid className={classes.root} container item xs={12}>
        <Card className={classes.card}>
          <CardHeader
            title={
              <Typography variant="h6" component="h6">
                Editer ses informations
              </Typography>
            }
          />
          <CardContent>
            <Typography variant="body2" component="h5">
              Mot de passe
            </Typography>
            {alert && alert.type === "error" && alert.field === "password" ? (
              <Fragment>
                <TextField
                  error
                  className={classes.textField}
                  variant="outlined"
                  placeholder="Ancien Mot de passe"
                  label="Ancien Mot de passe"
                  type="password"
                  value={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
                />
                <TextField
                  error
                  className={classes.textField}
                  variant="outlined"
                  placeholder="Nouveau Mot de passe"
                  label="Nouveau Mot de passe"
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
                <TextField
                  error
                  className={classes.textField}
                  variant="outlined"
                  placeholder="Confirmation du Mot de passe"
                  label="Confirmation du Mot de passe"
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </Fragment>
            ) : (
              <Fragment>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  placeholder="Ancien Mot de passe"
                  label="Ancien Mot de passe"
                  type="password"
                  value={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
                />
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  placeholder="Nouveau Mot de passe"
                  label="Nouveau Mot de passe"
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  placeholder="Confirmation du Mot de passe"
                  label="Confirmation du Mot de passe"
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </Fragment>
            )}
            <Divider className={classes.divider} />
            <Typography variant="body2" component="h5">
              Recommandations
            </Typography>
            {errorFields && errorFields.includes("rec_text") ? (
              <TextField
                error
                className={classes.textField}
                variant="outlined"
                placeholder="Entrer une lettre de recommandation"
                label="Lettre de recommandation"
                value={lettreRecommandation}
                multiline
                rows={4}
                onChange={e => setLettreRecommandation(e.target.value)}
              />
            ) : (
              <TextField
                className={classes.textField}
                variant="outlined"
                placeholder="Entrer une lettre de recommandation"
                label="Lettre de recommandation"
                value={lettreRecommandation}
                multiline
                rows={4}
                onChange={e => setLettreRecommandation(e.target.value)}
              />
            )}
            {errorFields && errorFields.includes("rec_author") ? (
              <TextField
                error
                className={classes.textField}
                variant="outlined"
                placeholder="Entrer l'auteur de cette recommandation"
                label="Auteur"
                value={author}
                onChange={e => setAuthor(e.target.value)}
              />
            ) : (
              <TextField
                className={classes.textField}
                variant="outlined"
                placeholder="Entrer l'auteur de cette recommandation"
                label="Auteur"
                value={author}
                onChange={e => setAuthor(e.target.value)}
              />
            )}
          </CardContent>
        </Card>

        <Card className={classes.card}>
          <CardHeader
            title={
              <Typography variant="h6" component="h6">
                Editer ses documents
              </Typography>
            }
          />
          <CardContent className={classes.cardContent}>
            <FormControl margin="dense">
              <label htmlFor="profile_pic">Photo de profil</label>
              <Input
                accept="image/*"
                className={classes.textField}
                id="profile_pic"
                name="profile_pic"
                type="file"
                placeholder="Photo de profil"
                onChange={e => setProfilePic(e.target.files[0])}
              />
            </FormControl>
            <FormControl margin="dense">
              <label htmlFor="convention">Convention de stage</label>
              <Input
                accept="application/pdf"
                className={classes.textField}
                type="file"
                id="convention"
                name="convention"
                onChange={e => setConventionStage(e.target.files[0])}
              />
            </FormControl>
            <FormControl margin="dense">
              <label htmlFor="renseignement">Fiche de renseignement</label>
              <Input
                accept="application/pdf"
                className={classes.textField}
                id="renseignement"
                name="renseignement"
                type="file"
                onChange={e => setFicheRenseignement(e.target.files[0])}
              />
            </FormControl>

            {/* <input
              accept="application/pdf"
              className={classes.textField}
              type="file"
              style={{ display: "none" }}
              id="convention"
              name="convention"
              onChange={e => setConventionStage(e.target.files[0])}
            />
            <label htmlFor="convention">
              <Button variant="contained" component="span">
                Convention de stage
                <CloudUploadIcon className={classes.rightIcon} />
              </Button>
            </label> */}

            {/* <input
              accept="application/pdf"
              className={classes.textField}
              style={{ display: "none" }}
              id="renseignement"
              name="renseignement"
              type="file"
              onChange={e => setFicheRenseignement(e.target.files[0])}
            />
            <label htmlFor="renseignement">
              <Button variant="contained" component="span">
                Fiche de renseignement
                <CloudUploadIcon className={classes.rightIcon} />
              </Button>
            </label> */}
          </CardContent>
        </Card>

        <Card className={classes.card}>
          <CardHeader
            title={
              <Typography variant="h6" component="h6">
                Ajouter une expérience
              </Typography>
            }
          />
          <CardContent>
            {errorFields && errorFields.includes("company_name") ? (
              <TextField
                error
                className={classes.textField}
                variant="outlined"
                placeholder="Nom de l'entreprise"
                label="Nom de l'entreprise"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            ) : (
              <TextField
                className={classes.textField}
                variant="outlined"
                placeholder="Nom de l'entreprise"
                label="Nom de l'entreprise"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            )}

            {errorFields && errorFields.includes("company_job_name") ? (
              <TextField
                error
                className={classes.textField}
                variant="outlined"
                placeholder="Nom du poste"
                label="Nom du poste"
                value={poste}
                onChange={e => setPoste(e.target.value)}
              />
            ) : (
              <TextField
                className={classes.textField}
                variant="outlined"
                placeholder="Nom du poste"
                label="Nom du poste"
                value={poste}
                onChange={e => setPoste(e.target.value)}
              />
            )}
            {errorFields && errorFields.includes("company_description") ? (
              <TextField
                error
                className={classes.textField}
                variant="outlined"
                placeholder="Description du poste"
                label="Description du poste"
                multiline
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            ) : (
              <TextField
                className={classes.textField}
                variant="outlined"
                placeholder="Description du poste"
                label="Description du poste"
                multiline
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            )}
            <MuiPickersUtilsProvider utils={MomentUtils} locale="fr">
              {errorFields && errorFields.includes("company_start_date") ? (
                <KeyboardDatePicker
                  error
                  margin="normal"
                  id="start-date"
                  label="Date de début"
                  value={start_date}
                  onChange={setStart_date}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              ) : (
                <KeyboardDatePicker
                  margin="normal"
                  id="start-date"
                  label="Date de début"
                  value={start_date}
                  onChange={setStart_date}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              )}
              {errorFields && errorFields.includes("company_end_date") ? (
                <KeyboardDatePicker
                  error
                  margin="normal"
                  id="end-date"
                  label="Date de fin"
                  value={end_date}
                  onChange={setEnd_date}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              ) : (
                <KeyboardDatePicker
                  margin="normal"
                  id="end-date"
                  label="Date de fin"
                  value={end_date}
                  onChange={setEnd_date}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              )}
            </MuiPickersUtilsProvider>
          </CardContent>
        </Card>
        {name !== "" ||
        poste !== "" ||
        description !== "" ||
        start_date !== null ||
        end_date !== null ||
        profilePic !== null ||
        oldPassword !== "" ||
        newPassword !== "" ||
        confirmPassword !== "" ||
        ficheRenseignement !== null ||
        conventionStage !== null ||
        lettreRecommandation !== "" ||
        author !== "" ? (
          <Button className={classes.btn} onClick={onSubmit} variant="outlined">
            Modifier ses informations
          </Button>
        ) : (
          <Button
            disabled
            className={classes.btn}
            onClick={onSubmit}
            variant="outlined"
          >
            Modifier ses informations
          </Button>
        )}
      </Grid>
    </Container>
  );
};

ProfileForm.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { updateUser, getUser }
)(ProfileForm);
