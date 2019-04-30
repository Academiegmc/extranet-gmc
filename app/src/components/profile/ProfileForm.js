import React, { PureComponent } from "react";
import { connect } from "react-redux";
import imageCompression from "browser-image-compression";
import bsCustomFileInput from "bs-custom-file-input";
import { updateUser, getUser } from "../../actions/usersAction";
import { logout } from "../../actions/authActions";
import ReturnButton from "../layout/ReturnButton";

import "./Profile.css";
class ProfileForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      poste: "",
      description: "",
      start_date: "",
      end_date: "",
      profile_pic: [],
      old_password: "",
      new_password: "",
      confirm_password: "",
      fiche_renseignement: [],
      convention_stage: [],
      lettre_recommandation: [],
      success: false,
      errors: {}
    };
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showAlert = this.showAlert.bind(this);
  }
  handleImageUpload = async event => {
    const imageFile = event.target.files[0];

    var options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      this.setState({ profile_pic: compressedFile });
    } catch (error) {
      console.error(error);
    }
  };
  onChange = e => {
    if (e.target.name === "renseignement") {
      if (e.target.files.length > 0) {
        if (e.target.files.length === 1) {
          this.setState({ fiche_renseignement: e.target.files[0] });
        }
      }
    }
    if (e.target.name === "convention") {
      if (e.target.files.length > 0) {
        if (e.target.files.length === 1) {
          this.setState({ convention_stage: e.target.files[0] });
        }
      }
    }
    if (e.target.name === "recommandation") {
      if (e.target.files.length > 0) {
        if (e.target.files.length === 1) {
          this.setState({ lettre_recommandation: e.target.files[0] });
        }
      }
    }
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.updateUser(
      this.state,
      this.props.auth.user.id,
      this.props.history
    );
  };
  showAlert = (style, error) => {
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
  componentDidUpdate(prevProps, prevState) {
    if (this.props.errors !== undefined) {
      this.setState({ errors: this.props.errors });
    }
  }
  componentDidMount() {
    bsCustomFileInput.init();
    this.props.getUser(this.props.match.params.id);
  }

  render() {
    let alert;
    // if (this.state.errors.status === 403) {
    //   if (this.state.errors.data !== undefined) {
    //     alert = this.showAlert(
    //       "alert alert-warning alert-dismissible fade show",
    //       "Session expirée. Vous serez redirigé vers la page d'accueil d'ici quelques secondes."
    //     );
    //     setTimeout(() => this.props.logout(), 2000);
    //     clearTimeout();
    //   }
    // }
    if (this.props.users.user.success) {
      alert = this.showAlert(
        "alert alert-success alert-dismissible fade show",
        "Profil modifié !"
      );
    }
    return (
      <div className="container">
        <ReturnButton history={this.props.history} />

        {alert}
        <h1>Editer votre profil</h1>
        <form
          className="form-shadow p-3 rounded card"
          onSubmit={this.onSubmit}
          encType="multipart/form-data"
        >
          <div className="form-group">
            <label htmlFor="old_password">Ancien mot de passe</label>
            <input
              type="password"
              className="form-control"
              id="old_password"
              name="old_password"
              placeholder="Ancien mot de passe"
              onChange={this.onChange}
              value={this.state.old_password}
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="new_password">Nouveau mot de passe</label>
              <input
                type="password"
                className="form-control"
                id="new_password"
                name="new_password"
                placeholder="Nouveau mot de passe"
                onChange={this.onChange}
                value={this.state.new_password}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="confirm_password">
                Confirmation du mot de passe
              </label>
              <input
                type="password"
                className="form-control"
                id="confirm_password"
                name="confirm_password"
                placeholder="Confirmation du mot de passe"
                onChange={this.onChange}
                value={this.state.confirm_password}
              />
            </div>
          </div>
          <hr />
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupFileAddon01">
                <i className="fas fa-user-circle" />
              </span>
            </div>
            <div className="custom-file">
              <input
                aria-describedby="inputGroupFileAddon01"
                type="file"
                className="custom-file-input"
                accept="image/*"
                id="profile_pic"
                name="profile_pic"
                placeholder="Choisissez votre photo"
                onChange={this.handleImageUpload}
              />
              <label
                className="custom-file-label"
                data-browse="Parcourir"
                htmlFor="profile_pic"
              >
                Photo de profil
              </label>
            </div>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupFileAddon01">
                <i className="fas fa-file-pdf" />
              </span>
            </div>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="renseignement"
                name="renseignement"
                placeholder="Choisissez votre fichier"
                onChange={this.onChange}
              />
              <label
                className="custom-file-label"
                data-browse="Parcourir"
                htmlFor="renseignement"
              >
                Fiche de renseignement
              </label>
            </div>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupFileAddon01">
                <i className="fas fa-file-pdf" />
              </span>
            </div>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="convention"
                name="convention"
                placeholder="Choisissez votre fichier"
                onChange={this.onChange}
              />
              <label
                className="custom-file-label"
                data-browse="Parcourir"
                htmlFor="convention"
              >
                Convention de stage
              </label>
            </div>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupFileAddon01">
                <i className="fas fa-file-pdf" />
              </span>
            </div>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="recommandation"
                name="recommandation"
                placeholder="Choisissez votre fichier"
                onChange={this.onChange}
              />
              <label
                className="custom-file-label"
                data-browse="Parcourir"
                htmlFor="recommandation"
              >
                Lettre de recommandation
              </label>
            </div>
          </div>
          <hr />
          <h3>Ajouter une Expérience</h3>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="poste">Poste</label>
              <input
                type="text"
                className="form-control"
                id="poste"
                name="poste"
                placeholder="Nom du poste"
                onChange={this.onChange}
                value={this.state.poste}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="name">Nom de l'entreprise</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Nom de l'entreprise"
                onChange={this.onChange}
                value={this.state.name}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">
              Description de la mission
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              name="description"
              rows="3"
              placeholder="Description de la mission"
              onChange={this.onChange}
              value={this.state.description}
            />
          </div>
          <div className="form-row">
            <div className="col-6 form-group">
              <label htmlFor="startDate">Date de départ</label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                name="start_date"
                aria-describedby="startDateHelp"
                placeholder="Date de fin"
                onChange={this.onChange}
                value={this.state.start_date}
              />
            </div>
            <div className="col-6 form-group">
              <label htmlFor="endDate">Date de fin</label>
              <input
                type="date"
                className="form-control"
                id="endDate"
                name="end_date"
                aria-describedby="endDateHelp"
                placeholder="Date de fin"
                onChange={this.onChange}
                value={this.state.end_date}
              />
            </div>
          </div>
          <button className="btn btn-primary" type="submit">
            Modifier
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { updateUser, getUser, logout }
)(ProfileForm);
