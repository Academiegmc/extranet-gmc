import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReturnButton from "../layout/ReturnButton";
import { urls } from "../../utils";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated)
      this.setState({ user: nextProps.auth.user });
  }
  componentDidMount() {}
  render() {
    const { user } = this.state;
    return (
      <div>
        <h1>Profile</h1>
      </div>
    );
  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  null
)(Profile);
