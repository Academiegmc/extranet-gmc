import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { getAllNews } from "../../actions/newsActions";
import ReturnButton from "../layout/ReturnButton";
import "./News.css";
import User from "../../assets/user.jpg";
class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: []
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.news.newsTab.data) {
      this.setState({ news: nextProps.news.newsTab.data });
    }
  }
  componentDidMount() {
    this.props.getAllNews();
  }

  render() {
    let imgNews;
    const allNews = this.state.news.map((news, index) => {
      if (news.images.length > 0) {
        imgNews = (
          <img
            className="img-fluid"
            src={`http://${process.env.REACT_APP_NODE_API}/images/${
              news.images[0]
            }`}
            alt={`Card image cap ` + index}
          />
        );
      }
      return (
        <div className="card d-flex flex-column w-100 mr-3 mb-3" key={index}>
          <div className="d-flex flex-column card-body">
            <div className="card-title text-left w-100 bg-light">
              <div className=" col d-sm-flex flex-sm-row justify-content-sm-start">
                <img
                  className="img-fluid rounded-circle img-circle align-self-center mr-2"
                  src={User}
                  alt="User picture"
                />
                {/* <Link className="align-self-center" to={`/news/${news._id}`}>
                  <h5>{news.title}</h5>
                </Link> */}
                <h5 className="align-self-center">{news.title}</h5>
              </div>
            </div>
            {news.images.length > 0 ? imgNews : null}
            <p className="card-text text-wrap p-2">
              {news.description}
              {/* {news.description.substring(0, news.description.indexOf("."))}
              {"..."} */}
            </p>
            <small>
              <i className="fas fa-calendar-alt" />{" "}
              {
                // <Moment locale="fr" fromNow ago>
                <Moment format="DD MMM, YYYY" locale="fr" fromNow ago>
                  {news.date}
                </Moment>
              }
            </small>
          </div>
        </div>
      );
    });
    return (
      <div className="container">
        <ReturnButton history={this.props.history} />
        <h1>Dernières News</h1>
        <div className="d-flex flex-column W-100">{allNews}</div>
      </div>
    );
  }
}
News.propTypes = {
  news: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  news: state.news
});
export default connect(
  mapStateToProps,
  { getAllNews }
)(News);
