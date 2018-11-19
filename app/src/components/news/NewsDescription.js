import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getANews } from "../../actions/newsActions";
import ReturnButton from "../layout/ReturnButton";
import { urls } from "../../utils";
class NewsDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      images: [],
      author: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.news.news.data) {
      this.setState({
        title: nextProps.news.news.data.title,
        description: nextProps.news.news.data.description,
        images: nextProps.news.news.data.images,
        author: nextProps.news.news.data.name
      });
    }
  }
  componentDidMount() {
    this.props.getANews(this.props.match.params.id);
  }
  render() {
    const { title, images, description, author } = this.state;
    const imagesOlTab = images.map((image, index) => {
      if (index === 0) {
        return (
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to={index}
            className="active"
            key={index}
          />
        );
      } else {
        return (
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to={index}
            key={index}
          />
        );
      }
    });
    const imagesTab = images.map((image, index) => {
      let imgTag = (
        <img
          className="d-block w-100"
          src={require(`../../assets/${image}`)}
          alt={`Card image cap ` + index}
        />
      );
      let data;
      if (image !== "") {
        if (index === 0) {
          data = (
            <div className="carousel-item active" key={index}>
              {imgTag}
            </div>
          );
        } else {
          data = (
            <div className="carousel-item" key={index}>
              {imgTag}
            </div>
          );
        }
      }
      return data;
    });
    const divFlex = {
      display: "flex",
      flexFlow: "row wrap",
      justifyContent: "center"
    };
    const cardStyle = { width: "100%", margin: 200 };
    return (
      <div className="container" style={divFlex}>
        <ReturnButton url={urls.news} />
        <div className="card" style={cardStyle}>
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">{imagesOlTab}</ol>
            <div className="carousel-inner">{imagesTab}</div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
          <div className="card-body">
            <div className="card-title">
              <h5>{title}</h5>
            </div>
            <h6 className="card-subtitle mb-2 text-muted">{author}</h6>
            <p className="card-text">{description}</p>
          </div>
        </div>
      </div>
    );
  }
}
NewsDescription.proptypes = {
  news: PropTypes.object.isRequired,
  getANews: PropTypes.func.isRequired
};
const mapStateToprops = state => ({
  news: state.news
});
export default connect(
  mapStateToprops,
  { getANews }
)(NewsDescription);
