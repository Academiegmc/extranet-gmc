import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import RichTextEditor from "react-rte";
import { createNews, getANews, updateNews } from "../../actions/newsActions";
import { logout } from "../../actions/authActions";
import { createAd, updateAd, getAnAd } from "../../actions/adAction";
import ReturnButton from "../layout/ReturnButton";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      category: "",
      images: [],
      errors: {},
      value: RichTextEditor.createEmptyValue()
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onValueChange = value => {
    this.setState({ value });
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(value.toString("html"));
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
    if (this.props.match.path === "/annonce/edit/:id") {
      this.props.getAnAd(this.props.match.params.id);
    }
    if (this.props.match.path === "/news/edit/:id") {
      this.props.getANews(this.props.match.params.id);
    }
  }
  onChange = e => {
    if (e.target.name === "images") {
      if (e.target.files.length > 0) {
        if (e.target.files.length === 1) {
          this.setState({ images: e.target.files[0] });
        } else {
          this.setState({ images: e.target.files });
        }
      }
    }
    // this.setState({ images: e.target.files[0] });
    else this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { images, title, description, category } = this.state;
    console.log(this.state);
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
      console.log(newAd);
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
    const toolbarConfig = {
      // Optionally specify the groups to display (displayed in the order listed).
      display: [
        "INLINE_STYLE_BUTTONS",
        "BLOCK_TYPE_BUTTONS",
        "LINK_BUTTONS",
        "BLOCK_TYPE_DROPDOWN",
        "HISTORY_BUTTONS"
      ],
      INLINE_STYLE_BUTTONS: [
        { label: "Bold", style: "BOLD", className: "custom-css-class" },
        { label: "Italic", style: "ITALIC" },
        { label: "Underline", style: "UNDERLINE" }
      ],
      BLOCK_TYPE_DROPDOWN: [
        { label: "Normal", style: "unstyled" },
        { label: "Heading Large", style: "header-one" },
        { label: "Heading Medium", style: "header-two" },
        { label: "Heading Small", style: "header-three" }
      ],
      BLOCK_TYPE_BUTTONS: [
        { label: "UL", style: "unordered-list-item" },
        { label: "OL", style: "ordered-list-item" }
      ]
    };
    return (
      <div className="container">
        <ReturnButton history={this.props.history} />
        <form className="flex-column flex-center" onSubmit={this.onSubmit}>
          <h5>{formTitle}</h5>
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
            {/* <RichTextEditor
              className="w-100 border-0"
              style={{ whiteSpace: "pre-wrap" }}
              aria-describedby={descriptionInputAria}
              placeholder={descriptionInputPlaceholder}
              toolbarConfig={toolbarConfig}
              id={descriptionInputName}
              name={descriptionInputName}
              value={this.state.value}
              onChange={this.onValueChange}
            /> */}
          </div>

          {isNews ? (
            <div className="form-group-file ">
              <input
                type="file"
                className="form-control-file"
                id="images"
                name="images"
                multiple
                onChange={this.onChange}
              />
              <div style={{ margin: "2%" }}>
                <p>
                  <small>Types de fichiers autorisés: .jpg .png.</small>
                </p>

                <p>
                  <small>Taille maximum : 2Mo.</small>
                </p>
              </div>
              {this.props.match.path === "/news/edit/:id" ? (
                <button className="btn btn-primary" style={{ width: "100%" }}>
                  Modifier la news
                </button>
              ) : (
                <button className="btn btn-primary" style={{ width: "100%" }}>
                  Ajouter la news
                </button>
              )}
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
                <option value="cosmétique">Cosmétique</option>
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
