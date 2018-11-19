import React, { Component } from "react";
import Form from "./Form";

class AddAnnonce extends Component {
  render() {
    return (
      <Form
        formTitle="Annonce"
        titleInputName="annonceTitle"
        titleInputPlaceholder="Intitulé de l'annonce"
        titleInputAria="annonceTitleHelp"
        descriptionInputName="annonceDescription"
        descriptionInputPlaceholder="Description de la annonce"
        descriptionInputAria="annonceDescriptionHelp"
        isNews={false}
      />
    );
  }
}
export default AddAnnonce;
