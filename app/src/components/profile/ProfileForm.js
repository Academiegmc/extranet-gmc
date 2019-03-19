import React, { Component, PureComponent } from "react";
import { updateUser, getUser } from "../../actions/usersAction";
import { connect } from "react-redux";
class ProfileForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      poste: "",
      description: "",
      start_date: "",
      end_date: "",
      profile_pic: "",
      old_password: "",
      new_password: "",
      confirm_password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange = e => {
    if (e.target.name === "profile_pic") {
      if (e.target.files.length > 0) {
        if (e.target.files.length === 1) {
          this.setState({ profile_pic: e.target.files[0] });
        }
      }
    }
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.updateUser(this.state);
  };
  componentDidUpdate(prevProps, prevState) {
    // console.log(this.props);
    if (this.props.errors.error !== undefined) {
      this.setState({ errors: this.props.errors });
    }
  }
  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  render() {
    let alert;
    if (this.state.errors.error !== undefined) {
      alert = (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {this.state.errors.error}
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
    }
    return (
      <div className="container">
        {alert}
        <h1>Editer votre profil</h1>
        <form onSubmit={this.onSubmit}>
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
          {/* <div className="form-group-file">
            <input
              type="file"
              className="form-control-file"
              id="profile_pic"
              name="profile_pic"
              multiple
              onChange={this.onChange}
            />
            <div style={{ margin: "2%" }}>
              <p>
                <small>Types de fichiers autorisés: .jpg .png.</small>
              </p>

              <p>
                <small>Taille maximum : 2Mo.</small>
              </p>
            </div>
            <button className="btn btn-primary" style={{ width: "100%" }}>
              Modifier le profil
            </button>
          </div> */}
          <hr />
          {/* <div className="form-row">
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
          </div> */}
          {/* <div className="form-group">
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
          </div> */}
          {/* <div className="form-row">
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
          </div> */}
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
  { updateUser, getUser }
)(ProfileForm);
