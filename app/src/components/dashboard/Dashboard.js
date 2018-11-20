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
    const cardContainerStyle = {
      display: "flex",
      justifyContent: "start",
      flexFlow: "row wrap"
    };
    const links = this.state.titles.map((title, id) => {
      if (status === 0 && title.title === "Hyperplanning") {
        title.link = urls.hypperplanning + "etudiant";
        console.log(title);
      }
      if (status === 2 && title.title === "Hyperplanning")
        title.link = urls.hypperplanning + "enseignant";
      return (
        // <div className="image-element-class" key={id} >
        <div className="card" key={id} style={cardStyle}>
          <div className="card-body">
            <h5 className="card-title text-center">
              {/* <Link to={`${title.link}`}>{title.title}</Link> */}
              <a href={`${title.link}`}>{title.title}</a>
            </h5>
          </div>
        </div>
        // </div>
      );
    });
    const news = this.state.news.map((title, id) => {
      return (
        // <div className="image-element-class" key={id} >
        <div className="card" key={id} style={cardStyle}>
          <div className="card-body">
            <Link to={`/news/${title._id}`}>
              <h5 className="card-title text-center"> {title.title} </h5>
            </Link>
          </div>
        </div>
        // </div>
      );
    });
    return (
      <div>
        <div className="container-fluid">
          <h3> Dernières news </h3>
          <div
            style={{
              display: "flex",
              flexFlow: "row nowrap",
              justifyContent: "center"
            }}
          >
            {news}
          </div>
        </div>
        <hr />
        {/* Dashboard */}
        <div className="container">
          <div className="row">
            <h3> Dashboard </h3>
            {/* <Masonry className="my-gallery-class" >{links}</Masonry> */}
            <div style={cardContainerStyle}> {links} </div>
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
