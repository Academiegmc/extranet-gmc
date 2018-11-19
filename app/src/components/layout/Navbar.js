import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: {}
    };
    this.logoutUser = this.logoutUser.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated)
      this.setState({
        user: nextProps.auth.user,
        isAuthenticated: nextProps.auth.isAuthenticated
      });
  }
  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
    this.setState({ isAuthenticated: false, user: {} });
    this.props.history.push("/");
  }
  render() {
    const { user, isAuthenticated } = this.state;
    let adminLink =
      user.status === 3 ? (
        <li className="nav-item active">
          <Link className="nav-link" to="/admin">
            Admin <span className="sr-only" />
          </Link>
        </li>
      ) : null;
    let data = isAuthenticated ? (
      <div className="form-inline my-2 my-lg-0">
        <h6 className="mr-sm-2">{user.name}</h6>
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          type="submit"
          onClick={this.logoutUser}
        >
          Logout
        </button>
      </div>
    ) : null;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            LOGO
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              {adminLink}
            </ul>
            {data}
          </div>
        </nav>
      </div>
    );
  }
}
const mapStatetoprops = state => ({
  auth: state.auth
});
export default connect(
  mapStatetoprops,
  { logout }
)(withRouter(Navbar));
