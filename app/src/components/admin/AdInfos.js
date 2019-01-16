import React, { Component } from "react";
import PropTypes from "prop-types";
import { deleteAd } from "../../actions/adAction";

class AdInfos extends Component {
  constructor(props) {
    super(props);
    this.deleteAnAd = this.deleteAnAd.bind(this);
  }
  deleteAnAd() {
    deleteAd(this.props.ad._id);
    this.props.refresh();
  }
  render() {
    const { ad } = this.props;
    return (
      <div className="flex-row">
        <h6 className="text-center">{ad.title}</h6>
        <i onClick={this.deleteAnAd} className="far fa-times-circle" />
      </div>
    );
  }
}

AdInfos.propTypes = {
  ad: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired
};

export default AdInfos;
