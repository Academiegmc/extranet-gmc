import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
export default ComposedComponent => {
  class RequireAuth extends Component {
    render() {
      if (!localStorage.jwtToken || !this.props.isAuthenticated) {
        return <Redirect to="/" />;
      } else {
        return <ComposedComponent {...this.props} />;
      }
    }
  }
  RequireAuth.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };
  const mapStateToprops = state => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      user: state.auth.user
    };
  };
  return connect(mapStateToprops)(RequireAuth);
};
