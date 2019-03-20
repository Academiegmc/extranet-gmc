import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactAutocomplete from "react-autocomplete";
import ReactMarkdown from "react-markdown";
import { getAllAds, searchAd } from "../../actions/adAction";
import ReturnButton from "../layout/ReturnButton";
import "./Annonces.css";
import Button from "../layout/Button";
class Annonces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      annonces: [],
      ads: [],
      items: [],
      disallowedTypes: ["image", "html", "inlineCode", "code"],
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
    let button;
    const { annonces } = this.state;
    const allAnnonces =
      annonces.length > 0
        ? annonces.map((annonce, index) => {
            console.log(annonce.category);
            let categoryIcon;
            let style;
            if (annonce.category === "etude") {
              categoryIcon = (
                <i className="fas fa-user-graduate my-auto annonce-icon" />
              );
              style = { height: "50px", backgroundColor: "#FF8962" };
              button = {
                type: "link",
                class: "btn btn-etude text-white w-25 rounded"
              };
            }
            if (annonce.category === "loisir") {
              categoryIcon = <i className="fas fa-dice my-auto annonce-icon" />;
              style = { height: "50px", backgroundColor: "#7FD1AE" };
              button = {
                type: "link",
                class: "btn btn-loisir text-white w-25 rounded"
              };
            }
            if (annonce.category === "cosmétique") {
              categoryIcon = <i className="fas fa-gift my-auto annonce-icon" />;
              style = { height: "50px", backgroundColor: "#A46855" };
              button = {
                type: "link",
                class: "btn btn-cosmetique text-white w-25 rounded"
              };
            }
            return (
              <div className="card annonce-card mx-2 my-2" key={index}>
                <div className="w-100 border card-body" style={style}>
                  <div className="d-flex flex-row justify-content-center border rounded-circle bg-light annonce-card-icon">
                    {categoryIcon}
                  </div>
                </div>
                <div className="card-body d-flex flex-column mt-3">
                  <h4 className="card-title">{annonce.title}</h4>
                  <h6 className="card-subtitle text-muted">{annonce.name}</h6>
                  {/* <h6 className="card-subtitle text-muted">{annonce.name}</h6>
                <h4 className="card-title">{annonce.title}</h4> */}
                  {/* <ReactMarkdown
                    className="card-text d-inline-block text-justify text-truncate"
                    source={annonce.description}
                    disallowedTypes={this.state.disallowedTypes}
                  /> */}
                  {/* <div className="card-text d-inline-block text-justify text-truncate">
                    {annonce.description}
                  </div> */}
                  {/* <Link
                    className="btn btn-primary text-white"
                    to={`/annonce/${annonce.id}`}
                  >
                    En savoir plus
                  </Link> */}
                  {Button(
                    button.type,
                    button.class,
                    `/annonce/${annonce.id}`,
                    "En savoir plus"
                  )}
                </div>
              </div>
            );
          })
        : null;

    return (
      <div className="container-fluid h-100">
        <div className="mx-3 row d-flex flex-column">
          <ReturnButton history={this.props.history} />
          <h1>Annonces</h1>
        </div>

        <div className="row mx-3 mb-3">
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
                  key={item.id}
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
              to={`/annonce/${this.state.ad_chose.id}`}
              className="btn btn-primary"
            >
              <i className="fas fa-search"> </i>
            </Link>
          </div>
        </div>
        <div className="d-sm-flex flex-sm-column flex-md-row flex-md-wrap mt-5">
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
