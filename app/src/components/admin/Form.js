import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { createNews } from "../../actions/newsActions";
import ReturnButton from "../layout/ReturnButton";
import { urls, newsUrl } from "../../utils";
import Axios from "axios";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      images: [],
      user: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.user.name)
      this.setState({ user: nextProps.auth.user.name });
  }
  onChange = e => {
    if (e.target.name === "images")
      this.setState({ images: e.target.files[0] });
    else this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { images, title, description } = this.state;
    if (this.props.formTitle === "News") {
      // this.props.createNews(userData, this.props.history);
      this.fileUpload(images, description, title);
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
        <ReturnButton url={urls.admin} />
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
                <button className="btn btn-primary" style={{ width: "100%" }}>
                  Ajouter la news
                </button>
              </div>
            </div>
          ) : (
            <div className="form-group">
              <button className="btn btn-primary" style={{ width: "100%" }}>
                Ajouter l'annonce
              </button>
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
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { createNews }
)(withRouter(Form));
