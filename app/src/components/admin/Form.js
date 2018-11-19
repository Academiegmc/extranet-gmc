import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { createNews } from "../../actions/newsActions";
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
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props.history);
    console.log(nextProps);
    if (nextProps.auth.user.name)
      this.setState({ user: nextProps.auth.user.name });
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const userData = this.state;
    if (this.props.formTitle === "News")
      this.props.createNews(userData, this.props.history);
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
