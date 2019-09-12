import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { logout } from "../actions/authActions";

toast.configure();

export default ComposedComponent => {
  const RequireAuth = props => {
    const { isAuthenticated, errors } = props;
    if (!localStorage.jwtToken || !isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      if (
        errors.errors !== null &&
        errors.errors.message === "Session expirée."
      ) {
        toast(errors.errors.message, { type: "error" });
        props.logout();
        return <Redirect to="/" />;
      } else {
        return <ComposedComponent {...props} />;
      }
      // return <ComposedComponent {...props} />;
      // return <h1>Hello</h1>;
    }
    // return <ComposedComponent {...props} />;
  };
  RequireAuth.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
  };
  const mapStateToprops = state => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      user: state.auth.user,
      errors: state.errors
    };
  };
  return connect(
    mapStateToprops,
    { logout }
  )(RequireAuth);
};
