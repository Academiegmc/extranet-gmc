import React, { Component } from "react";
import Form from "./Form";

class AddAnnonce extends Component {
  render() {
    return (
      <Form
        formTitle="Annonce"
        titleInputName="title"
        titleInputPlaceholder="Intitulé de l'annonce"
        titleInputAria="annonceTitleHelp"
        descriptionInputName="description"
        descriptionInputPlaceholder="Description de la annonce"
        descriptionInputAria="annonceDescriptionHelp"
        isNews={false}
      />
    );
  }
}
export default AddAnnonce;
