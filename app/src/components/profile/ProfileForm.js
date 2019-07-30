import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import imageCompression from "browser-image-compression";
import bsCustomFileInput from "bs-custom-file-input";
import { updateUser, getUser } from "../../actions/usersAction";
import { logout } from "../../actions/authActions";
import ReturnButton from "../layout/ReturnButton";

import "./Profile.css";
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
  Divider
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import MomentUtils from "@date-io/moment";

import "moment/locale/fr";
import Alert from "../layout/Alert";
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
  updateUser,
  logout
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
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    bsCustomFileInput.init();
    getUser(match.params.id);
  }, []);
  const handleImageUpload = async () => {
    // const imageFile = event.target.files[0];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    try {
      let compressedFile;
      if (profilePic !== null) {
        compressedFile = await imageCompression(profilePic, options);
        setProfilePic(compressedFile);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const checkPassword = (pass, new_pass, confirm_pass) => {
    if (pass === "" && (new_pass !== "" || confirm_pass !== "")) {
      setAlert({
        msg: "Veuillez entrer un mot de passe.",
        type: "error"
      });
      setTimeout(() => setAlert(null), 5000);
    } else {
      if (new_pass !== confirm_pass) {
        setAlert({
          msg: "Vos mots de passe ne correspondent pas.",
          type: "error",
          field: "password"
        });
        setTimeout(() => setAlert(null), 5000);
        return;
      }
    }
  };
  const checkRecommandation = (rec_text, rec_author) => {
    if (
      (rec_text === "" && rec_author !== "") ||
      (rec_text !== "" && rec_author === "")
    ) {
      setAlert({
        msg: "Veuillez remplir les deux champs",
        type: "error",
        field: "recommandation"
      });
      setTimeout(() => setAlert(null), 5000);
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
    setErrorFields(errorTab);
    if (errorTab.length > 0) {
      setAlert({
        msg: "Veuillez corriger les informations rentrées dans le formulaire",
        type: "error",
        field: errorTab
      });
      setTimeout(() => setAlert(null), 5000);
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
    // console.log(data);
    console.log(errorFields);
    updateUser(data, auth.user.id);
    if (errorFields && errorFields.length === 0) {
      setAlert({
        msg: "Vos informations ont été modifiées !",
        type: "success",
        field: []
      });
      setTimeout(() => setAlert(null), 5000);
    }
  };
  if (loading || users === null) {
    return <h3>Chargement...</h3>;
  }
  // console.log(alert);

  return (
    <Container fixed>
      <Alert alert={alert} />
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
            {alert &&
            alert.type === "error" &&
            alert.field === "recommandation" ? (
              <Fragment>
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
                <TextField
                  error
                  className={classes.textField}
                  variant="outlined"
                  placeholder="Entrer l'auteur de cette recommandation"
                  label="Auteur"
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                />
              </Fragment>
            ) : (
              <Fragment>
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
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  placeholder="Entrer l'auteur de cette recommandation"
                  label="Auteur"
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                />
              </Fragment>
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
            <input
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
            </label>

            <input
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
            </label>
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
    // <div className="container">
    //   <ReturnButton history={history} />
    //   <h1>Editer votre profil</h1>
    //   <form
    //     className="form-shadow p-3 rounded card"
    //     onSubmit={onSubmit}
    //     encType="multipart/form-data"
    //   >
    //     <div className="form-group">
    //       <label htmlFor="old_password">Ancien mot de passe</label>
    //       <input
    //         type="password"
    //         className="form-control"
    //         placeholder="Ancien mot de passe"
    //         onChange={e => setOldPassword(e.target.value)}
    //         value={oldPassword}
    //       />
    //     </div>
    //     <div className="form-row">
    //       <div className="form-group col-md-6">
    //         <label htmlFor="new_password">Nouveau mot de passe</label>
    //         <input
    //           type="password"
    //           className="form-control"
    //           placeholder="Nouveau mot de passe"
    //           onChange={e => setNewPassword(e.target.value)}
    //           value={newPassword}
    //         />
    //       </div>
    //       <div className="form-group col-md-6">
    //         <label htmlFor="confirm_password">
    //           Confirmation du mot de passe
    //         </label>
    //         <input
    //           type="password"
    //           className="form-control"
    //           placeholder="Confirmation du mot de passe"
    //           onChange={e => setConfirmPassword(e.target.value)}
    //           value={confirmPassword}
    //         />
    //       </div>
    //     </div>
    //     <hr />
    //     <div className="input-group mb-3">
    //       <div className="input-group-prepend">
    //         <span className="input-group-text" id="inputGroupFileAddon01">
    //           <i className="fas fa-user-circle" />
    //         </span>
    //       </div>
    //       <div className="custom-file">
    //         <input
    //           aria-describedby="inputGroupFileAddon01"
    //           type="file"
    //           className="custom-file-input"
    //           accept="image/*"
    //           id="profile_pic"
    //           name="profile_pic"
    //           placeholder="Choisissez votre photo"
    //           onChange={handleImageUpload}
    //         />
    //         <label
    //           className="custom-file-label"
    //           data-browse="Parcourir"
    //           htmlFor="profile_pic"
    //         >
    //           Photo de profil
    //         </label>
    //       </div>
    //     </div>
    //     <div className="input-group mb-3">
    //       <div className="input-group-prepend">
    //         <span className="input-group-text" id="inputGroupFileAddon01">
    //           <i className="fas fa-file-pdf" />
    //         </span>
    //       </div>
    //       <div className="custom-file">
    //         <input
    //           type="file"
    //           className="custom-file-input"
    //           id="renseignement"
    //           name="renseignement"
    //           placeholder="Choisissez votre fichier"
    //           onChange={onChange}
    //         />
    //         <label
    //           className="custom-file-label"
    //           data-browse="Parcourir"
    //           htmlFor="renseignement"
    //         >
    //           Fiche de renseignement
    //         </label>
    //       </div>
    //     </div>
    //     <div className="input-group mb-3">
    //       <div className="input-group-prepend">
    //         <span className="input-group-text" id="inputGroupFileAddon01">
    //           <i className="fas fa-file-pdf" />
    //         </span>
    //       </div>
    //       <div className="custom-file">
    //         <input
    //           type="file"
    //           className="custom-file-input"
    //           id="convention"
    //           name="convention"
    //           placeholder="Choisissez votre fichier"
    //           onChange={onChange}
    //         />
    //         <label
    //           className="custom-file-label"
    //           data-browse="Parcourir"
    //           htmlFor="convention"
    //         >
    //           Convention de stage
    //         </label>
    //       </div>
    //     </div>
    //     <div className="input-group mb-3">
    //       <div className="input-group-prepend">
    //         <span className="input-group-text" id="inputGroupFileAddon01">
    //           <i className="fas fa-file-pdf" />
    //         </span>
    //       </div>
    //       <div className="custom-file">
    //         <input
    //           type="file"
    //           className="custom-file-input"
    //           id="recommandation"
    //           name="recommandation"
    //           placeholder="Choisissez votre fichier"
    //           onChange={onChange}
    //         />
    //         <label
    //           className="custom-file-label"
    //           data-browse="Parcourir"
    //           htmlFor="recommandation"
    //         >
    //           Lettre de recommandation
    //         </label>
    //       </div>
    //     </div>
    //     <hr />
    //     <h3>Ajouter une Expérience</h3>
    //     <div className="form-row">
    //       <div className="form-group col-md-6">
    //         <label htmlFor="poste">Poste</label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           id="poste"
    //           name="poste"
    //           placeholder="Nom du poste"
    //           onChange={e => setPoste(e.target.value)}
    //           value={poste}
    //         />
    //       </div>
    //       <div className="form-group col-md-6">
    //         <label htmlFor="name">Nom de l'entreprise</label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           id="name"
    //           name="name"
    //           placeholder="Nom de l'entreprise"
    //           onChange={e => setName(e.target.value)}
    //           value={name}
    //         />
    //       </div>
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="exampleFormControlTextarea1">
    //         Description de la mission
    //       </label>
    //       <textarea
    //         className="form-control"
    //         id="exampleFormControlTextarea1"
    //         name="description"
    //         rows="3"
    //         placeholder="Description de la mission"
    //         onChange={e => setDescription(e.target.value)}
    //         value={description}
    //       />
    //     </div>
    //     <div className="form-row">
    //       <div className="col-6 form-group">
    //         <label htmlFor="startDate">Date de départ</label>
    //         <input
    //           type="date"
    //           className="form-control"
    //           id="startDate"
    //           name="start_date"
    //           aria-describedby="startDateHelp"
    //           placeholder="Date de fin"
    //           onChange={e => setStart_date(e.target.value)}
    //           value={start_date}
    //         />
    //       </div>
    //       <div className="col-6 form-group">
    //         <label htmlFor="endDate">Date de fin</label>
    //         <input
    //           type="date"
    //           className="form-control"
    //           id="endDate"
    //           name="end_date"
    //           aria-describedby="endDateHelp"
    //           placeholder="Date de fin"
    //           onChange={e => setEnd_date(e.target.value)}
    //           value={end_date}
    //         />
    //       </div>
    //     </div>
    //     <button className="btn btn-primary" type="submit">
    //       Modifier
    //     </button>
    //   </form>
    // </div>
  );
};

ProfileForm.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { updateUser, getUser, logout }
)(ProfileForm);
