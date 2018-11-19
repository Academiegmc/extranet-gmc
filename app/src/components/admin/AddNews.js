import React, { Component } from "react";
import Form from "./Form";

class AddNews extends Component {
  render() {
    return (
      <Form
        formTitle="News"
        titleInputName="title"
        titleInputPlaceholder="Intitulé de la news"
        titleInputAria="newsTitleHelp"
        descriptionInputName="description"
        descriptionInputPlaceholder="Description de la news"
        descriptionInputAria="newsDescriptionHelp"
        isNews={true}
      />
    );
  }
}
export default AddNews;
