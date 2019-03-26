import React, { Component, PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllUsers } from "../../actions/usersAction";
import ReturnButton from "../layout/ReturnButton";
class Trombinoscope extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log(this.props.users.users.data);
    if (this.props.users.users.data) {
      this.setState({ users: this.props.users.users.data });
    }
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
        <div className="flex flex-row flex-center">
          <ReturnButton history={this.props.history} />
          <h1>Trombinoscope</h1>
        </div>
        <div className="flex flex-column">{allUsers}</div>
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
