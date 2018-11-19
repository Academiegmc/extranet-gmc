import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titles: [
        {
          title: "Mails",
          link: ""
        },
        {
          title: "Job Board",
          link: "jobboard"
        },
        {
          title: "Trombinoscope",
          link: ""
        },
        {
          title: "News",
          link: "news"
        },
        {
          title: "Hyperplanning",
          link: ""
        },
        {
          title: "Annonces",
          link: "annonces"
        },
        {
          title: "Classroom",
          link: ""
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
      news: [
        {
          title: "Article",
          link: ""
        },
        {
          title: "Article",
          link: ""
        },
        {
          title: "Article",
          link: ""
        },
        {
          title: "Article",
          link: ""
        },
        {
          title: "Article",
          link: ""
        }
      ]
    };
  }

  render() {
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
      return (
        // <div className="image-element-class" key={id} >
        <div className="card" key={id} style={cardStyle}>
          <div className="card-body">
            <h5 className="card-title text-center">
              <Link to={`/${title.link}`}>{title.title}</Link>
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
            <h5 className="card-title text-center"> {title.title} </h5>
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
  errors: state.errors
});
export default connect(
  mapStateToProps,
  {}
)(Dashboard);
