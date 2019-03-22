import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import TextareaAutosize from "react-autosize-textarea";
import "./Markdown.css";
export default class Markdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "# test",
      value: "",
      disallowedTypes: ["inlineCode", "code"]
    };
    this.onChange = this.onChange.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }
  onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  fetchData = () => {
    fetch(require("./sample.md"))
      .then(res => {
        return res.text();
      })
      .then(text => this.setState({ value: text }));
  };
  componentDidMount() {
    this.fetchData();
  }
  render() {
    return (
      <div className="container">
        <div className="row w-100">
          <h2>Tuto : Ecrire un article</h2>
          <p>
            Ci-dessous un exemple d'écriture d'un article. Vous pouvez tester et
            voir en direct comment est rendu votre paragraphe
          </p>
        </div>
        <div className="row w-100">
          <div className="col-6">
            <TextareaAutosize
              className="w-100 border-0"
              placeholder="Votre commentaire..."
              name="value"
              id="value"
              value={this.state.value}
              onChange={this.onChange}
            />
          </div>
          <ReactMarkdown
            className="markdown col-6 h-100 w-100"
            source={this.state.value}
            disallowedTypes={this.state.disallowedTypes}
            escapeHtml={false}
            linkTarget={"_blank"}
          />
        </div>
      </div>
    );
  }
}
