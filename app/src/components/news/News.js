import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllNews } from "../../actions/newsActions";
import ReturnButton from "../layout/ReturnButton";
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
    const divFlex = {
      display: "flex",
      flexFlow: "column wrap"
    };
    const cardStyle = { width: "100%", marginBottom: 20 };
    const allNews = this.state.news.map((news, index) => {
      if (news.images.length > 0) {
        imgNews = (
          <img
            className="card-img-top"
            src={`${news.images[0]}`}
            alt={`Card image cap ` + index}
          />
        );
      }
      return (
        <div className="card" key={index} style={cardStyle}>
          {news.images.length > 0 ? imgNews : null}
          <div className="card-body">
            <div className="card-title">
              <h5>{news.title}</h5>
            </div>
            <p className="card-text">{news.description}</p>
            <Link to={`/news/${news._id}`} className="btn btn-primary">
              En savoir plus
            </Link>
          </div>
        </div>
      );
    });
    return (
      <div className="container">
        <ReturnButton history={this.props.history} />
        <h1>Dernières News</h1>
        <div style={divFlex}>{allNews}</div>
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
