import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllNews } from "../../actions/newsActions";
import { urls } from "../../utils";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      titles: [
        {
          title: "Mails",
          link: urls.mails
        },
        {
          title: "Job Board",
          link: "jobboard"
        },
        {
          title: "Trombinoscope",
          link: urls.trombinoscope
        },
        {
          title: "News",
          link: "news"
        },
        {
          title: "Hyperplanning",
          link: urls.hypperplanning
        },
        {
          title: "Annonces",
          link: "annonces"
        },
        {
          title: "Classroom",
          link: urls.classroom
        },
        {
          title: "Règlement Intérieur",
          link:
            "http://localhost:9000/reglement-interieur/2019-2020-Reglement-Interieur.pdf"
        },
        {
          title: "Stages",
          link: "stage/"
        }
      ],
      news: []
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.news.isloading && nextProps.news.newsTab.data.length > 0) {
      this.setState({ news: nextProps.news.newsTab.data });
    }
    if (nextProps.auth.user) this.setState({ user: nextProps.auth.user });
  }
  componentDidMount() {
    this.props.getAllNews();
  }
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
        <li
          className="card mx-auto"
          style={{ width: "300px", marginBottom: "5%" }}
          key={id}
        >
          <div className="card-body">
            <h5 className="card-title text-center">
              <a href={`${title.link}`}>{title.title}</a>
            </h5>
          </div>
        </li>
      );
    });
    const news = this.state.news.map((title, id) => {
      return (
        <div className="card mx-3" style={{ width: "300px" }} key={id}>
          <div className="card-body">
            <Link to={`/news/${title._id}`}>
              <h5 className="card-title text-center"> {title.title} </h5>
            </Link>
          </div>
        </div>
      );
    });
    return (
      <div className="container-fluid">
        <div className="row d-flex flex-column">
          <h1 className="text-center"> Dernières news </h1>
          <div className="d-flex flex-row justify-content-center row">
            {news}
          </div>
        </div>
        <hr />

        <div className="row d-flex flex-column">
          <h1 className="text-center">Dashboard</h1>
          <div className="container">
            <ul className="row">{links}</ul>
          </div>
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
  news: state.news,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getAllNews }
)(Dashboard);
