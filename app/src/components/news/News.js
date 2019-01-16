import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { getAllNews } from "../../actions/newsActions";
import ReturnButton from "../layout/ReturnButton";
import { urls } from "../../utils";
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
            className="card-img-top"
            src={`${urls.proxy}/images/${news.images[0]}`}
            alt={`Card image cap ` + index}
          />
        );
      }
      return (
        <div className="card" key={index}>
          {news.images.length > 0 ? imgNews : null}
          <div className="flex-column text-center card-body">
            <div className="card-title">
              <Link to={`/news/${news._id}`}>
                <h5>{news.title}</h5>
              </Link>

              <span>
                <i className="fas fa-calendar-alt" />
                {<Moment format="DD MMM, YYYY">{news.date}</Moment>}
              </span>
            </div>
            <p className="card-text">
              {news.description.substring(0, news.description.indexOf("."))}
            </p>
          </div>
        </div>
      );
    });
    return (
      <div className="news-container">
        <ReturnButton history={this.props.history} />
        <h1>Dernières News</h1>
        <div className="flex-row flex-wrap">{allNews}</div>
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
