import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllAds, searchAd } from "../../actions/adAction";
import ReturnButton from "../layout/ReturnButton";
class Annonces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      annonces: [],
      ads: [],
      value: ""
    };
    this.searchAds = this.searchAds.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.ads.ads.data)
      this.setState({ annonces: nextProps.ads.ads.data });
  }
  componentDidMount() {
    this.props.getAllAds();
  }
  searchAds(e) {
    let ads = searchAd(e.target.value);
    this.setState({ ads });
  }
  render() {
    const { annonces } = this.state;
    const allAnnonces =
      annonces.length > 0
        ? annonces.map((annonce, index) => (
            <div className="card " key={index}>
              <div className="card-body text-left text-wrap">
                <h6 className="card-subtitle text-muted">{annonce.name}</h6>
                <h4 className="card-title">{annonce.title}</h4>
                <p className="card-text text-justify">{annonce.description}</p>
                <Link to={`/annonce/${annonce._id}`}>
                  <button className="btn btn-primary">En savoir plus</button>
                </Link>
              </div>
            </div>
          ))
        : null;

    return (
      <div className="container">
        <ReturnButton history={this.props.history} />
        <h1>Annonces</h1>
        <form>
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">
              <i className="fas fa-newspaper"> </i>
            </span>
            <input
              type="text"
              name="search"
              className="form-control"
              placeholder="Mot clés"
              aria-label="Mot clés"
              aria-describedby="basic-addon1"
              onKeyUp={this.searchAds}
            />
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-search"> </i>
            </button>
          </div>
        </form>
        <hr />
        <div className="d-flex flex-column">{allAnnonces}</div>
      </div>
    );
  }
}

Annonces.propTypes = {
  ads: PropTypes.object.isRequired,
  getAllAds: PropTypes.func.isRequired
};
const mapStatetoProps = state => ({
  ads: state.ads
});
export default connect(
  mapStatetoProps,
  { getAllAds }
)(Annonces);
