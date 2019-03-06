import React, { Component } from "react";
import PropTypes from "prop-types";
import { deleteAd } from "../../actions/adAction";

class AdInfos extends Component {
  constructor(props) {
    super(props);
    this.deleteAnAd = this.deleteAnAd.bind(this);
  }
  deleteAnAd() {
    deleteAd(this.props.ad.id);
    this.props.refresh();
  }
  render() {
    const { ad } = this.props;
    return (
      <div className="d-flex flex-row flex-wrap">
        <i
          onClick={this.deleteAnAd}
          className="btn btn-outline-danger far fa-times-circle"
        />
        <h6 className="text-center ml-2 mt-2">{ad.title}</h6>
      </div>
    );
  }
}

AdInfos.propTypes = {
  ad: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired
};

export default AdInfos;
