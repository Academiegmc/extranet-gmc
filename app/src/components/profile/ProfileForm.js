import React, { Component } from "react";
import { updateUser } from "../../actions/usersAction";
import { connect } from "react-redux";
class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      poste: "",
      description: "",
      start_date: "",
      end_date: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.updateUser(this.state);
  };
  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <h1>Editer votre profil</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Poste</label>
              <input
                type="text"
                className="form-control"
                id="inputEmail4"
                name="poste"
                placeholder="Nom du poste"
                onChange={this.onChange}
                value={this.state.poste}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Nom de l'entreprise</label>
              <input
                type="text"
                className="form-control"
                id="inputPassword4"
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
  users: state.users
});
export default connect(
  mapStateToProps,
  { updateUser }
)(ProfileForm);
