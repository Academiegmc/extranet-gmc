import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteNews } from "../../actions/newsActions";

class NewsInfos extends Component {
  constructor(props) {
    super(props);
    this.deleteANews = this.deleteANews.bind(this);
  }
  deleteANews() {
    this.props.deleteNews(this.props.news.id);
    this.props.refresh();
  }
  render() {
    const { news } = this.props;
    return (
      <div className="d-flex flex-row flex-wrap">
        <i
          onClick={this.deleteANews}
          className="btn btn-outline-danger far fa-times-circle"
        />
        <h6 className="text-center ml-2 mt-2">{news.title}</h6>
      </div>
    );
  }
}

NewsInfos.propTypes = {
  news: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteNews }
)(NewsInfos);
