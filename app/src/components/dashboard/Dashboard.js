import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllNews } from "../../actions/newsActions";
import { urls } from "../../utils";
import "./Dashboard.css";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      titles: [
        {
          title: "Mails",
          icon: "fas fa-envelope",
          link: urls.mails
        },
        {
          title: "Job Board",
          icon: "fas fa-suitcase",
          link: "jobboard"
        },
        {
          title: "Trombinoscope",
          icon: "fas fa-users",
          link: urls.trombinoscope
        },
        {
          title: "News",
          icon: "fas fa-newspaper",
          link: "news"
        },
        {
          title: "Hyperplanning",
          icon: "fas fa-calendar-alt",
          link: urls.hypperplanning
        },
        {
          title: "Annonces",
          icon: "fas fa-bullhorn",
          link: "annonces"
        },
        {
          title: "Classroom",
          icon: "fas fa-school",
          link: urls.classroom
        },
        {
          title: "Règlement Intérieur",
          icon: "fas fa-graduation-cap",
          link: urls.ri
        },
        {
          title: "Stages",
          icon: "fas fa-envelope",
          link: "stage/"
        }
      ],
      news: []
    };
  }
  componentDidMount = () => {
    if (this.props.auth.user) this.setState({ user: this.props.auth.user });
  };

  render() {
    const { status } = this.state.user;
    const links = this.state.titles.map((title, id) => {
      if (status === 0 && title.title === "Hyperplanning") {
        title.link = urls.hypperplanning + "etudiant";
      }
      if (status === 2 && title.title === "Hyperplanning")
        title.link = urls.hypperplanning + "enseignant";
      if (title.title === "Stages" && this.state.user.id !== undefined) {
        title.link += this.state.user.id;
      }
      return (
        <li className="list" key={id}>
          <div className="d-flex flex-md-column align-items-center justify-content-start mb-3">
            <div
              className="card border rounded-circle"
              style={{ width: "100px", height: "100px" }}
            >
              <div className="icon-link">
                <h5 className="text-center">
                  {title.link.indexOf("http") === -1 ? (
                    <Link to={`${title.link}`}>
                      <i className={title.icon} />
                    </Link>
                  ) : (
                    <a href={`${title.link}`}>{<i className={title.icon} />}</a>
                  )}
                  {/* <a href={`${title.link}`}>{title.title}</a> */}
                </h5>
              </div>
            </div>
            <p className="text-anim text-center mx-auto">{title.title}</p>
          </div>
        </li>
      );
    });
    return (
      <div className="container-fluid h-100">
        {/* <hr className="d-sm-flex flex-sm-column flex-md-row w-100" /> */}
        <div className="col w-100 h-50 ">
          <h1 className="welcome-text welcome-anim text-center">Extranet</h1>
        </div>
        <div className="col d-sm-flex flex-sm-column justify-self-sm-center h-50">
          <div
            style={{ position: "relative", top: "50px" }}
            className="border-top d-none d-md-flex flex-md-row w-100 hr-anim"
          />
          <ul className="d-sm-flex flex-sm-column flex-md-row justify-content-between">
            {links}
          </ul>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getAllNews }
)(Dashboard);
