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
      <div>
        <h6>{news.title}</h6>
        <button onClick={this.deleteANews}>Supprimer</button>
      </div>
    );
  }
}

NewsInfos.propTypes = {
  news: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired
};

export default NewsInfos;
