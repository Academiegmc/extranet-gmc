import React, { Component } from "react";
import PropTypes from "prop-types";
import { deleteNews } from "../../actions/newsActions";

class NewsInfos extends Component {
  constructor(props) {
    super(props);
    this.deleteANews = this.deleteANews.bind(this);
  }
  deleteANews() {
    deleteNews(this.props.news._id);
    this.props.refresh();
  }
  render() {
    const { news } = this.props;
    return (
      <div className="flex-row">
        <h6 className="text-center">{news.title}</h6>

        <i onClick={this.deleteANews} className="far fa-times-circle" />
      </div>
    );
  }
}

NewsInfos.propTypes = {
  news: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired
};

export default NewsInfos;
