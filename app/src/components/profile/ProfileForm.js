import React, { useState, useEffect } from "react";
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
  Button
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import MomentUtils from "@date-io/moment";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import "moment/locale/fr";
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
  textField: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10
  },
  btn: {
    width: "100%"
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
  const [lettreRecommandation, setLettreRecommandation] = useState(null);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    bsCustomFileInput.init();
    getUser(match.params.id);
  }, []);
  const handleImageUpload = async event => {
    const imageFile = event.target.files[0];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      setProfilePic(compressedFile);
    } catch (error) {
      console.error(error);
    }
  };
  const onChange = e => {
    if (e.target.name === "renseignement") {
      if (e.target.files.length > 0) {
        if (e.target.files.length === 1) {
          setFicheRenseignement(e.target.files[0]);
        }
      }
    }
    if (e.target.name === "convention") {
      if (e.target.files.length > 0) {
        if (e.target.files.length === 1) {
          setConventionStage(e.target.files[0]);
        }
      }
    }
    if (e.target.name === "recommandation") {
      if (e.target.files.length > 0) {
        if (e.target.files.length === 1) {
          setLettreRecommandation(e.target.files[0]);
        }
      }
    }
  };
  const onSubmit = e => {
    e.preventDefault();
    const data = {
      name,
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
      lettre_recommandation: lettreRecommandation
    };
    console.log(data);
    // updateUser(data, auth.user.id, history);
  };
  const showAlert = (style, error) => {
    return (
      <div className={style} role="alert">
        {error}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  };
  if (loading || users === null) {
    return <h3>Chargement...</h3>;
  }
  return (
    <Container fixed>
      <Grid className={classes.root} container item xs={12}>
        <Card className={classes.card}>
          <CardHeader
            title={
              <Typography variant="h6" component="h6">
                Editer son Mot de passe
              </Typography>
            }
          />
          <CardContent>
            <TextField
              className={classes.textField}
              variant="outlined"
              placeholder="Ancien Mot de passe"
              label="Ancien Mot de passe"
              onClick={e => setOldPassword(e.target.value)}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              placeholder="Nouveau Mot de passe"
              label="Nouveau Mot de passe"
              onClick={e => setNewPassword(e.target.value)}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              placeholder="Confirmation du Mot de passe"
              label="Confirmation du Mot de passe"
              onClick={e => setConfirmPassword(e.target.value)}
            />
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
          <CardContent>
            <TextField
              className={classes.textField}
              variant="outlined"
              placeholder="Ancien Mot de passe"
              label="Ancien Mot de passe"
              onClick={e => setOldPassword(e.target.value)}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              placeholder="Nouveau Mot de passe"
              label="Nouveau Mot de passe"
              onClick={e => setNewPassword(e.target.value)}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              placeholder="Confirmation du Mot de passe"
              label="Confirmation du Mot de passe"
              onClick={e => setConfirmPassword(e.target.value)}
            />
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
            <TextField
              className={classes.textField}
              variant="outlined"
              placeholder="Nom de l'entreprise"
              label="Nom de l'entreprise"
              value={name}
              onClick={e => setName(e.target.value)}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              placeholder="Nom du poste"
              label="Nom du poste"
              value={poste}
              onClick={e => setPoste(e.target.value)}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              placeholder="Description du poste"
              label="Description du poste"
              multiline
              value={description}
              onClick={e => setDescription(e.target.value)}
            />
            <MuiPickersUtilsProvider utils={MomentUtils} locale="fr">
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
            </MuiPickersUtilsProvider>
          </CardContent>
        </Card>
        <Button className={classes.btn} onClick={onSubmit} variant="outlined">
          Modifier ses informations
        </Button>
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
