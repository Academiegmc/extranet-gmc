import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Navbar from "./components/layout/Navbar";
import { logout } from "./actions/authActions";
// import Footer from "./components/layout/Footer";
class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      auth: true
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.errors.auth === false) {
      this.setState({ auth: this.props.errors.auth });
    }
  }

  render() {
    let alert;
    if (this.state.auth === false) {
      alert = (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          Session expirée. Vous serez redirigé vers la page d'accueil d'ici
          quelques secondes.
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
      setTimeout(() => this.props.logout(), 2000);
      clearTimeout();
    }
    return (
      <div className="h-20">
        <Navbar />
        {alert}
        {/* <Footer /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { logout }
)(App);
