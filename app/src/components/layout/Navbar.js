import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import { getUser } from "../../actions/usersAction";
import Logo from "../../assets/Favicon.png";
import "./Navbar.css";
class Navbar extends PureComponent {
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
  componentDidUpdate(prevProps, prevState) {
    this.setState({ user: this.props.users.user.user });
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { user } = this.state;
    let adminLink;
    let data;
    let imageProfile;
    if (this.props.users.user.user !== undefined) {
      if (this.props.users.user.user.profile_pic._id !== undefined)
        imageProfile = this.props.users.user.user.profile_pic._id;
      else imageProfile = this.props.users.user.user.profile_pic;
    } else {
      imageProfile = this.props.auth.user.profile_pic;
    }
    if (user !== undefined) {
      adminLink =
        user.status === 3 ? (
          <li className="nav-item active">
            <Link className="nav-link  align-self-center" to="/admin">
              Admin <span className="sr-only" />
            </Link>
          </li>
        ) : null;
    }
    data = isAuthenticated ? (
      <div className="d-flex flex-row nav-animate">
        <Link className="nav-link" to={`/profile/${this.props.auth.user.id}`}>
          <img
            className="rounded-circle"
            style={{ width: "100px", height: "100px" }}
            src={`http://${
              process.env.REACT_APP_NODE_API
            }/api/users/image/${imageProfile}`}
            alt={this.props.auth.user.name}
          />
        </Link>
        <button
          className="btn btn-link"
          type="button"
          onClick={this.logoutUser}
        >
          Déconnexion
        </button>
      </div>
    ) : null;
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
                this.props.location.pathname === "/jobboard"
                  ? "nav-item active"
                  : "nav-item"
              }
            >
              <Link className="nav-link align-self-center" to="/jobboard">
                Jobboard
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
                Annonces
              </Link>
            </li>
            <li
              className={
                this.props.location.pathname === "/trombinoscope"
                  ? "nav-item active"
                  : "nav-item"
              }
            >
              <Link className="nav-link align-self-center" to="/trombinoscope">
                Trombinoscope
              </Link>
            </li>
            {/* {adminLink} */}
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
