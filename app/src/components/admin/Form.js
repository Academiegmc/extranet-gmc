import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import bsCustomFileInput from "bs-custom-file-input";
import imageCompression from "browser-image-compression";
import "./Form.css";
import { createNews, getANews, updateNews } from "../../actions/newsActions";
import { logout } from "../../actions/authActions";
import { createAd, updateAd, getAnAd } from "../../actions/adAction";
import ReturnButton from "../layout/ReturnButton";
import Loading from "../layout/Loading";

class Form extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      category: "etude",
      images: [],
      errors: {},
      loading: false,
      triggerShadowEvent: false
    };
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.triggerShadow = this.triggerShadow.bind(this);
  }
  handleImageUpload = async event => {
    const imageFile = event.target.files[0];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    try {
      this.setState({ loading: true });
      const compressedFile = await imageCompression(imageFile, options);
      this.setState({ images: compressedFile, loading: false });
    } catch (error) {
      console.error(error);
    }
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
    if (nextProps.ads.ad.data) {
      this.setState({ title: nextProps.ads.ad.data.title });
      this.setState({ description: nextProps.ads.ad.data.description });
      this.setState({ category: nextProps.ads.ad.data.category });
    }
    if (nextProps.news.news.data) {
      this.setState({ title: nextProps.news.news.data.title });
      this.setState({ description: nextProps.news.news.data.description });
      this.setState({ category: nextProps.news.news.data.category });
    }
  }
  componentDidMount() {
    bsCustomFileInput.init();
    if (this.props.match.path === "/annonce/edit/:id") {
      this.props.getAnAd(this.props.match.params.id);
    }
    if (this.props.match.path === "/news/edit/:id") {
      this.props.getANews(this.props.match.params.id);
    }
  }
  triggerShadow(e) {
    this.setState({ triggerShadowEvent: !this.state.triggerShadowEvent });
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { images, title, description, category } = this.state;
    if (this.props.match.path === "/admin/news") {
      this.props.createNews({ images, description, title }, this.props.history);
    }
    if (this.props.match.path === "/news/edit/:id") {
      this.props.updateNews(
        this.props.match.params.id,
        { images, description, title },
        this.props.history
      );
    }
    if (this.props.match.path === "/admin/annonce") {
      const newAd = {
        title: this.state.title,
        description: this.state.description,
        category: this.state.category
      };
      this.props.createAd(newAd, this.props.history);
    }
    if (this.props.match.path === "/annonce/edit/:id") {
      updateAd(
        this.props.match.params.id,
        { title, description, category },
        this.props.history
      );
    }
  };
  render() {
    if (this.props.errors.status === 403) this.props.logout();
    const {
      formTitle,
      titleInputName,
      titleInputPlaceholder,
      titleInputAria,
      descriptionInputName,
      descriptionInputPlaceholder,
      descriptionInputAria,
      isNews
    } = this.props;
    let loading;
    let updateBtn;
    let createBtn;
    let btnClass = "btn btn-primary w-100 mt-3";
    if (this.state.loading) {
      updateBtn = (
        <button className={btnClass} disabled>
          Modifier la news
        </button>
      );
      createBtn = (
        <button className={btnClass} disabled>
          Ajouter la news
        </button>
      );
    } else {
      updateBtn = <button className={btnClass}>Modifier la news</button>;
      createBtn = <button className={btnClass}>Ajouter la news</button>;
    }
    if (this.state.loading) loading = <Loading />;
    else loading = null;
    return (
      <div className="container">
        <ReturnButton history={this.props.history} />
        <form
          className="flex-column flex-center card rounded form-shadow fade show p-5"
          onSubmit={this.onSubmit}
          onMouseEnter={this.triggerShadow}
          onMouseLeave={this.triggerShadow}
        >
          <h5 className="text-center">{formTitle}</h5>
          <div className="form-group-text">
            <label htmlFor={titleInputName}>Titre</label>
            <input
              type="text"
              className="form-control"
              id={titleInputName}
              name={titleInputName}
              aria-describedby={titleInputAria}
              placeholder={titleInputPlaceholder}
              onChange={this.onChange}
              value={this.state.title}
            />
          </div>

          <div className="form-group-textarea">
            <label htmlFor={descriptionInputName}>Description</label>
            <textarea
              className="form-control"
              style={{ whiteSpace: "pre-wrap" }}
              id={descriptionInputName}
              name={descriptionInputName}
              aria-describedby={descriptionInputAria}
              placeholder={descriptionInputPlaceholder}
              onChange={this.onChange}
              value={this.state.description}
            />
          </div>

          {isNews ? (
            <div className="input-group mt-3 mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupFileAddon01">
                  <i className="fas fa-file-pdf" />
                </span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  accept="image/*"
                  id="images"
                  name="images"
                  multiple
                  onChange={this.handleImageUpload}
                />
                <label
                  className="custom-file-label"
                  data-browse="Parcourir"
                  htmlFor="images"
                >
                  Illustrez vos propos avec des images
                </label>
                <small>Types de fichiers autorisés: .jpg .png.</small>
                <small>Taille maximum : 2Mo.</small>
              </div>
              {loading}
              {this.props.match.path === "/news/edit/:id"
                ? updateBtn
                : createBtn}
            </div>
          ) : (
            <div className="form-group-select">
              <label htmlFor="category">Catégorie</label>
              <select
                className="form-control"
                id="category"
                name="category"
                aria-describedby="categoryHelp"
                placeholder="Type de contrat"
                onChange={this.onChange}
                value={this.state.category}
              >
                <option value="etude">Etude</option>
                <option value="loisir">Loisir</option>
                <option value="cosmetique">Cosmétique</option>
              </select>
              {this.props.match.path === "/annonce/edit/:id" ? (
                <button className="btn btn-primary" style={{ width: "100%" }}>
                  Modifier l'annonce
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  style={{ width: "100%", marginTop: "2%" }}
                >
                  Ajouter l'annonce
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    );
  }
}
Form.propTypes = {
  news: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  news: state.news,
  auth: state.auth,
  errors: state.errors,
  ads: state.ads
});
export default connect(
  mapStateToProps,
  { createNews, createAd, getAnAd, getANews, logout, updateNews }
)(withRouter(Form));
