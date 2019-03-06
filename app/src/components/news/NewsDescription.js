import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Slider from "react-slick";
import { getANews } from "../../actions/newsActions";
import ReturnButton from "../layout/ReturnButton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
    const settings = {
      adaptiveHeight: true,
      dots: true,
      infinite: true,
      fade: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    const { title, images, description, author } = this.state;
    const imgTab = images.map((img, index) => (
      <div key={index}>
        <img
          className="card-img-top"
          src={`http://${process.env.REACT_APP_NODE_API}/images/${img}`}
          alt={`Card image cap ` + index}
        />
      </div>
    ));
    console.log(images);
    return (
      <div className="container flex-column mt-5">
        <ReturnButton history={this.props.history} />
        <div className="card rounded">
          <Slider {...settings}>{imgTab}</Slider>
          <div className="card-body">
            <div className="card-title text-capitalize">
              <h5>{title}</h5>
            </div>
            <h6 className="card-subtitle text-muted">{author}</h6>
            <hr />
            <h6>Description</h6>
            <p className="card-text text-justify">{description}</p>
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
