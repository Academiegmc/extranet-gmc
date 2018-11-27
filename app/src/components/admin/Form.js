import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { createNews } from "../../actions/newsActions";
import { logout } from "../../actions/authActions";
import { createAd, updateAd, getAnAd } from "../../actions/adAction";
import ReturnButton from "../layout/ReturnButton";
import { newsUrl } from "../../utils";
import Axios from "axios";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      category: "Etude",
      images: [],
      user: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
    if (nextProps.ads.ad.data) {
      this.setState({ title: nextProps.ads.ad.data.title });
      this.setState({ description: nextProps.ads.ad.data.description });
      this.setState({ category: nextProps.ads.ad.data.category });
    }
    if (nextProps.auth.user.name)
      this.setState({ user: nextProps.auth.user.name });
  }
  componentDidMount() {
    if (this.props.match.path === "/annonce/edit/:id") {
      this.props.getAnAd(this.props.match.params.id);
    }
  }
  onChange = e => {
    if (e.target.name === "images")
      this.setState({ images: e.target.files[0] });
    else this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { images, title, description, category } = this.state;
    if (this.props.match.path === "/news/edit/:id") {
      this.fileUpload(images, description, title);
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
      const adUpdated = { title, description, category };
      this.props.updateAd(
        this.props.match.params.id,
        adUpdated,
        this.props.history
      );
    }
  };
  fileUpload = (images, description, title) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("images", images);
    const config = { headers: { "content-type": "multipart/form-data" } };
    Axios.post(newsUrl, formData, config)
      .then(res => {
        this.props.history.push("/admin");
      })
      .catch(err => console.log(err));
  };
  render() {
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
    return (
      <div className="container">
        <ReturnButton history={this.props.history} />
        <form onSubmit={this.onSubmit}>
          <h5>{formTitle}</h5>
          <div className="form-group">
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

          <div className="form-group">
            <label htmlFor={descriptionInputName}>Description</label>
            <textarea
              type="text"
              className="form-control"
              id={descriptionInputName}
              name={descriptionInputName}
              aria-describedby={descriptionInputAria}
              placeholder={descriptionInputPlaceholder}
              onChange={this.onChange}
              value={this.state.description}
            />
          </div>

          {isNews ? (
            <div>
              <div className="form-group input-group">
                <input
                  type="file"
                  className="form-control-file"
                  name="images"
                  // required
                  onChange={this.onChange}
                />
                <p>
                  <small>
                    Types de fichiers autorisés: .pdf .doc .docx .jpg .png .bmp.
                    Taille maximum : 2Mo.
                  </small>
                </p>
              </div>
              <div className="form-group">
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
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="category">Catégorie</label>
                <select
                  type="text"
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
              </div>
              <div className="form-group">
                {this.props.match.path === "/annonce/edit/:id" ? (
                  <button className="btn btn-primary" style={{ width: "100%" }}>
                    Modifier l'annonce
                  </button>
                ) : (
                  <button className="btn btn-primary" style={{ width: "100%" }}>
                    Ajouter l'annonce
                  </button>
                )}
              </div>
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
  { createNews, createAd, updateAd, getAnAd, logout }
)(withRouter(Form));
