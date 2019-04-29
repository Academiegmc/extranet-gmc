import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import data from "../../mock/trombinoscope.json";
import "./Trombinoscope.css";
import { getAllUsers } from "../../actions/usersAction";
import ReturnButton from "../layout/ReturnButton";
class Trombinoscope extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      data: {}
    };
  }
  componentDidUpdate(prevProps, prevState) {}
  componentDidMount() {
    this.setState({ data });
  }
  render() {
    let status;
    const { administration, pedagogie } = this.state.data;
    const allUsers =
      administration !== undefined
        ? administration.map((user, index) => {
            if (user.status === 0) status = "élève";
            if (user.status === 1) status = "Ancien élève";
            if (user.status === 2) status = "Professeur";
            if (user.status === 3) status = "Administrateur";
            return (
              <div
                className="animated-card w-auto d-flex flex-column text-center m-2 align-items-center"
                key={index}
              >
                <img
                  className="portrait border"
                  src={require(`../../assets/${user.image}`)}
                  alt="User proile pic"
                />
                <h6 className="title">{user.name}</h6>
                <p className="text">{user.fonction}</p>
                <p className="text">{status}</p>
                <hr />
              </div>
            );
          })
        : null;
    const allPedago =
      pedagogie !== undefined
        ? pedagogie.map((user, index) => {
            if (user.status === 0) status = "élève";
            if (user.status === 1) status = "Ancien élève";
            if (user.status === 2) status = "Professeur";
            if (user.status === 3) status = "Administrateur";
            return (
              <div
                className="w-auto d-flex flex-column text-center m-2 align-items-center"
                key={index}
              >
                <img
                  className="portrait border"
                  src={require(`../../assets/${user.image}`)}
                  alt="User proile pic"
                />
                <h6 className="title">{user.name}</h6>
                <p className="text text-wrap">{user.fonction}</p>
                <p className="text">{status}</p>
                <hr />
              </div>
            );
          })
        : null;
    return (
      <div className="container-fluid">
        <div className="d-flex flex-row flex-center">
          <ReturnButton history={this.props.history} />
          <h1>Trombinoscope</h1>
        </div>
        <h2 className="text-center">Administration</h2>
        <div
          id="section-one"
          className="d-flex flex-column flex-md-row flex-wrap"
        >
          {allUsers}
        </div>
        <hr />
        <h2 className="text-center">Pédagogie</h2>
        <div
          id="section-two"
          className="d-flex flex-column flex-md-row flex-wrap"
        >
          {allPedago}
        </div>
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
