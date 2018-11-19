import React, { Component } from "react";

class AddJob extends Component {
  render() {
    return (
      <div className="container">
        <form>
          <h5>Poste</h5>
          <div className="form-group">
            <label htmlFor="jobTitle">Titre</label>
            <input
              type="text"
              className="form-control"
              id="jobTitle"
              name="jobTitle"
              aria-describedby="jobTitleHelp"
              placeholder="Intitulé du poste"
            />
          </div>
          <div className="form-group">
            <label htmlFor="jobDescription">Description du poste</label>
            <textarea
              type="text"
              className="form-control"
              id="jobDescription"
              name="jobDescription"
              aria-describedby="jobDescriptionHelp"
              placeholder="Description du poste"
            />
          </div>

          <div className="form-group">
            <label htmlFor="jobContractType">Type de contrat</label>
            <select
              type="text"
              className="form-control"
              id="jobContractType"
              name="jobContractType"
              aria-describedby="jobContractTypeHelp"
              placeholder="Type de contrat"
            >
              <option>Stage</option>
              <option>CDI</option>
              <option>CDD</option>
              <option>Contrat d'apprentissage</option>
              <option>Contrat de professionnalisation</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="jobType">Durée de travail</label>
            <select
              type="text"
              className="form-control"
              id="jobType"
              name="jobType"
              aria-describedby="jobTypeHelp"
              placeholder="Durée de travail"
            >
              <option>Temps plein</option>
              <option>Temps partiel</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="jobRemuneration">Rémunération</label>
            <select
              type="text"
              className="form-control"
              id="jobRemuneration"
              name="jobRemuneration"
              aria-describedby="jobRemunerationHelp"
              placeholder="Rémunération"
            >
              <option>Tarif conventionnel</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="jobStartDate">Date de départ</label>
            <input
              type="date"
              className="form-control"
              id="jobStartDate"
              name="jobStartDate"
              aria-describedby="jobStartDateHelp"
              placeholder="Date de départ"
            />
          </div>

          <div className="form-group">
            <label htmlFor="jobSkills">Compétences clés</label>
            <input
              type="text"
              className="form-control"
              id="jobSkills"
              name="jobSkills"
              aria-describedby="jobSkillsHelp"
              placeholder="Compétences clés"
            />
          </div>

          <hr />
          <h5>Localisation</h5>
          <div className="form-group">
            <label htmlFor="jobCity">Ville</label>
            <input
              type="text"
              className="form-control"
              id="jobCity"
              name="jobCity"
              aria-describedby="jobCityHelp"
              placeholder="Ville"
            />
          </div>

          <div className="form-group">
            <label htmlFor="jobCountry">Pays</label>
            <select
              type="text"
              className="form-control"
              id="jobCountry"
              name="jobCountry"
              aria-describedby="jobCountryHelp"
              placeholder="Pays"
            >
              <option>France</option>
            </select>
          </div>
          <hr />
          <h5>Entreprise</h5>
          <div className="form-group">
            <label htmlFor="jobCompany">Nom de l'entreprise</label>
            <input
              type="text"
              className="form-control"
              id="jobCompany"
              name="jobCompany"
              aria-describedby="jobCompanyHelp"
              placeholder="Nom de l'entreprise"
            />
          </div>
          <div className="form-group">
            <label htmlFor="jobCompanyDescription">
              Description de l'entreprise
            </label>
            <textarea
              type="text"
              className="form-control"
              id="jobCompanyDescription"
              name="jobCompanyDescription"
              aria-describedby="jobCompanyDescriptionHelp"
              placeholder="Description de l'entreprise"
            />
          </div>
          <div className="form-group">
            <label htmlFor="jobCompanySite">Site de l'entreprise</label>
            <input
              type="text"
              className="form-control"
              id="jobCompanySite"
              name="jobCompanySite"
              aria-describedby="jobCompanySiteHelp"
              placeholder="Site de l'entreprise"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%" }}
          >
            Envoyer
          </button>
        </form>
      </div>
    );
  }
}
export default AddJob;
