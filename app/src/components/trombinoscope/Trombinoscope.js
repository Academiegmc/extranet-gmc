import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllUsers } from "../../actions/usersAction";
import ReturnButton from "../layout/ReturnButton";
import { urls } from "../../utils";
class Trombinoscope extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.users.users.data)
      this.setState({ users: nextProps.users.users.data });
  }
  componentDidMount() {
    this.props.getAllUsers();
  }
  render() {
    let status;
    const { users } = this.state;
    const allUsers = users.map((user, index) => {
      if (user.status === 0) status = "élève";
      if (user.status === 1) status = "Ancien élève";
      if (user.status === 2) status = "Professeur";
      if (user.status === 3) status = "Administrateur";
      return (
        <div key={index}>
          <h6>{user.name}</h6>
          <p>{user.email}</p>
          <p>{status}</p>
          <hr />
        </div>
      );
    });
    return (
      <div className="container">
        <ReturnButton url={urls.dashboard} />
        <h1>Trombinoscope</h1>
        {allUsers}
      </div>
    );
  }
}

Trombinoscope.propTypes = {
  users: PropTypes.object.isRequired,
  getAllUsers: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  users: state.users
});
export default connect(
  mapStateToProps,
  { getAllUsers }
)(Trombinoscope);
