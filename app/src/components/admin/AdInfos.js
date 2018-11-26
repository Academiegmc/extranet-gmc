import React, { Component } from "react";
import PropTypes from "prop-types";
import { deleteAd } from "../../actions/adAction";

class AdInfos extends Component {
  constructor(props) {
    super(props);
    this.deleteAnAd = this.deleteAnAd.bind(this);
  }
  deleteAnAd() {
    deleteAd(this.props.ad._id, this.props.history);
    this.props.refresh();
  }
  render() {
    const { ad } = this.props;
    return (
      <div>
        <h6>{ad.title}</h6>
        <button onClick={this.deleteAnAd}>Supprimer</button>
      </div>
    );
  }
}

AdInfos.propTypes = {
  ad: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired
};

export default AdInfos;
