import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactAutocomplete from "react-autocomplete";
import { getAllAds, searchAd } from "../../actions/adAction";
import ReturnButton from "../layout/ReturnButton";
import "./Annonces.css";
class Annonces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      annonces: [],
      ads: [],
      items: [],
      value: "",
      ad_chose: {}
    };
    this.searchAds = this.searchAds.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.ads) {
      const { ads, search_ads } = nextProps.ads;
      if (ads.data) {
        this.setState({ annonces: nextProps.ads.ads.data });
      }
      if (search_ads) this.setState({ items: search_ads });
    }
  }
  componentDidMount() {
    this.props.getAllAds();
  }
  searchAds(e) {
    this.props.searchAd(e);
    this.setState({ value: e });
  }
  render() {
    const { annonces } = this.state;
    const allAnnonces =
      annonces.length > 0
        ? annonces.map((annonce, index) => (
            <div className="card annonce-card mx-2" key={index}>
              <div
                className="w-100 border h-25 card-body"
                style={{ backgroundColor: "rgb(244, 233, 222)" }}
              >
                <div className="d-flex flex-row justify-content-center border rounded-circle bg-light annonce-card-icon">
                  <i className="fas fa-user-graduate my-auto annonce-icon" />
                </div>
              </div>
              <div className="card-body d-flex flex-column mt-3">
                <h4 className="card-title">{annonce.title}</h4>
                <h6 className="card-subtitle text-muted">{annonce.name}</h6>
                {/* <h6 className="card-subtitle text-muted">{annonce.name}</h6>
                <h4 className="card-title">{annonce.title}</h4> */}
                <div className="card-text d-inline-block text-justify text-truncate">
                  {annonce.description}
                </div>
                <Link
                  className="btn btn-primary text-white"
                  to={`/annonce/${annonce._id}`}
                >
                  En savoir plus
                </Link>
              </div>
            </div>
          ))
        : null;

    return (
      <div className="container-fluid h-100">
        <div className="row d-flex flex-column">
          <ReturnButton history={this.props.history} />
          <h1>Annonces</h1>
        </div>

        <div className="row mb-3">
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">
              <i className="fas fa-newspaper"> </i>
            </span>
            <ReactAutocomplete
              className="form-control"
              items={this.state.items}
              shouldItemRender={(item, value) =>
                item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
              }
              getItemValue={item => item.title}
              renderItem={(item, highlighted) => (
                <div
                  key={item._id}
                  style={{
                    backgroundColor: highlighted ? "#eee" : "transparent"
                  }}
                >
                  <p
                    onClick={() => {
                      this.setState({ ad_chose: item });
                    }}
                  >
                    {item.title}
                  </p>
                </div>
              )}
              renderInput={props => (
                <input
                  {...props}
                  role="combobox"
                  name="search"
                  className="form-control"
                />
              )}
              value={this.state.value}
              onChange={e => {
                this.searchAds(e.target.value);
                if (this.state.value === "") this.setState({ ad_chose: {} });
              }}
              onSelect={(value, item) =>
                this.setState({ value, ad_chose: item })
              }
              wrapperStyle={{ display: "inline-block", width: "40%" }}
            />
            <Link
              to={`/annonce/${this.state.ad_chose._id}`}
              className="btn btn-primary"
            >
              <i className="fas fa-search"> </i>
            </Link>
          </div>
        </div>
        <div className="d-sm-flex flex-sm-column flex-md-row flex-md-wrap">
          {allAnnonces}
        </div>
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
  { getAllAds, searchAd }
)(Annonces);
