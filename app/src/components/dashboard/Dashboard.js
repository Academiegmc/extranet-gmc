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
          link: ""
        },
        {
          title: "Stages",
          link: ""
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
    const cardStyle = {
      width: "18rem",
      marginLeft: "20px",
      marginRight: "20px",
      marginBottom: "20px"
    };
    const links = this.state.titles.map((title, id) => {
      if (status === 0 && title.title === "Hyperplanning") {
        title.link = urls.hypperplanning + "etudiant";
      }
      if (status === 2 && title.title === "Hyperplanning")
        title.link = urls.hypperplanning + "enseignant";
      return (
        <li key={id}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">
                <a href={`${title.link}`}>{title.title}</a>
              </h5>
            </div>
          </div>
        </li>
      );
    });
    const news = this.state.news.map((title, id) => {
      return (
        <div className="card" key={id}>
          <div className="card-body">
            <Link to={`/news/${title._id}`}>
              <h5 className="card-title text-center"> {title.title} </h5>
            </Link>
          </div>
        </div>
      );
    });
    return (
      <div className="dashboard-container flex-column">
        <div className="news-header">
          <h1 className="text-center"> Dernières news </h1>
          <div className="flex-row flex-center">{news}</div>
        </div>

        <h1 className="text-center">Dashboard</h1>
        <ul className="flex-row flex-wrap flex-center ">{links}</ul>
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
