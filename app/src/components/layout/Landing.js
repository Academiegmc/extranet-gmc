import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/authActions";
import Logo from "../../assets/logo.png";
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) this.props.history.push("/dashboard");
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  };
  render() {
    return (
      <div className="container-fluid">
        <div
          style={{
            height: "200px",
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <img src={Logo} className="" alt="logo" />
        </div>
        <hr />
        <div
          style={{
            height: "200px",
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={this.onChange}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Mot de passe</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                onChange={this.onChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Connexion
            </button>
          </form>
        </div>
      </div>
    );
  }
}
Landing.prototypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Landing);
