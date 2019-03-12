import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import Slider from "react-slick";
import ReactMarkdown from "react-markdown";
import { getAllNews } from "../../actions/newsActions";
import ReturnButton from "../layout/ReturnButton";
import "./News.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import User from "../../assets/user.jpg";
class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      disallowedTypes: ["image", "html", "inlineCode", "code"]
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
    let imgNews;
    const allNews = this.state.news.map((news, index) => {
      if (news.images.length > 0) {
        imgNews = news.images.map((img, i) => (
          <div key={i}>
            <img
              className="card-img-top"
              src={`http://${process.env.REACT_APP_NODE_API}/images/${img}`}
              alt={`Card image cap ` + i}
            />
          </div>
        ));
      }
      return (
        <div className="card d-flex flex-column w-100 mr-3 mb-3" key={index}>
          <div className="d-flex flex-column card-body">
            <div className="card-title text-left w-100 bg-light">
              <div className="col-sm d-sm-flex flex-sm-row justify-content-sm-center justify-content-md-start">
                <img
                  className="img-fluid rounded-circle img-circle align-self-center mr-2"
                  src={User}
                  alt="User pic"
                />
                <h5 className="align-self-center">{news.title}</h5>
              </div>
            </div>
            {news.images.length > 0 ? (
              <Slider className="mb-3" {...settings}>
                {imgNews}
              </Slider>
            ) : null}
            <ReactMarkdown
              className="card-text p-2"
              source={news.description}
              disallowedTypes={this.state.disallowedTypes}
              linkTarget={"_blank"}
            />
            {/* <p className="card-text p-2" style={{ whiteSpace: "pre-line" }}>
              {news.description}
            </p> */}
            <small>
              <i className="fas fa-calendar-alt" />{" "}
              {
                <Moment format="DD MMM, YYYY" locale="fr">
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
