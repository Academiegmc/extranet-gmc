import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import { getUser } from "../../actions/usersAction";
import Logo from "../../assets/Favicon.png";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: {}
    };
    this.logoutUser = this.logoutUser.bind(this);
  }
  logoutUser(e) {
    const { logout, history } = this.props;
    e.preventDefault();
    logout();
    if (history) history.push("/");
  }
  render() {
    const { user, isAuthenticated } = this.props.auth;
    let adminLink =
      user.status === 3 ? (
        <li className="nav-item active">
          <Link className="nav-link  align-self-center" to="/admin">
            Admin <span className="sr-only" />
          </Link>
        </li>
      ) : null;
    let data = isAuthenticated ? (
      <div className="d-flex flex-row">
        <Link className="nav-link" to={`/profile/${user.id}`}>
          <h6 className="">{user.name}</h6>
        </Link>
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={this.logoutUser}
        >
          Déconnexion
        </button>
      </div>
    ) : null;
    let active;
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light h-20"
        style={{ backgroundColor: "#f4e9de" }}
      >
        <Link className="nav-item" to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li
              className={
                this.props.location.pathname === "/" ||
                this.props.location.pathname === "/dashboard"
                  ? "nav-item active"
                  : "nav-item"
              }
            >
              <Link className="nav-link align-self-center" to="/">
                Accueil <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li
              className={
                this.props.location.pathname === "/news"
                  ? "nav-item active"
                  : "nav-item"
              }
            >
              <Link className="nav-link align-self-center" to="/news">
                News
              </Link>
            </li>
            <li
              className={
                this.props.location.pathname === "/annonces"
                  ? "nav-item active"
                  : "nav-item"
              }
            >
              <Link className="nav-link align-self-center" to="/annonces">
                Annonces <span className="sr-only">(current)</span>
              </Link>
            </li>
            {adminLink}
          </ul>
          {data}
        </div>
      </nav>
    );
  }
}
const mapStatetoprops = state => ({
  auth: state.auth,
  users: state.users
});
export default connect(
  mapStatetoprops,
  { logout, getUser }
)(Navbar);
