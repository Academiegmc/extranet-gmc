import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllAds } from "../../actions/adAction";
class Annonces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      annonces: []
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.ads.ads.data)
      this.setState({ annonces: nextProps.ads.ads.data });
  }
  componentDidMount() {
    this.props.getAllAds();
  }
  render() {
    const divFlex = {
      display: "flex",
      flexFlow: "column wrap"
    };
    const cardStyle = { width: "100%", marginBottom: 20 };
    const allAnnonces =
      this.state.annonces.length > 0
        ? this.state.annonces.map((annonce, index) => (
            <div className="card" key={index} style={cardStyle}>
              <div className="card-body">
                <div className="card-title">
                  <h5>{annonce.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {annonce.name}
                  </h6>
                </div>
                <p className="card-text">{annonce.description}</p>
                <Link to={`/annonce/${annonce._id}`}>
                  <button className="btn btn-primary">En savoir plus</button>
                </Link>
              </div>
            </div>
          ))
        : null;
    return (
      <div className="container">
        <h1>Annonces</h1>
        <div style={divFlex}>{allAnnonces}</div>
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
