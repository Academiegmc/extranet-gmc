import React, { useState, useEffect, useRef } from "react";
import Moment from "moment";
import ReturnButton from "../layout/ReturnButton";
import { connect } from "react-redux";
import { getAJob, updateJob, createJob } from "../../actions/jobActions";
import {
  makeStyles,
  Container,
  Card,
  CardHeader,
  Typography,
  CardContent,
  TextField,
  NativeSelect,
  Input,
  FormControl,
  InputLabel,
  OutlinedInput,
  Divider,
  Button
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import "moment/locale/fr";

import Alert from "../layout/Alert";
import "./AddJob.css";

const useStyle = makeStyles(theme => ({
  root: {
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%"
  },
  divider: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "black"
  },
  btn: {
    width: "100%",
    padding: theme.spacing(1),
    backgroundColor: "#C9B8B7",
    color: "white"
  }
}));
const AddJob = ({
  jobs,
  getAJob,
  createJob,
  updateJob,
  loading,
  match,
  history
}) => {
  const classes = useStyle();
  const updateUrl = "/job/edit/:id";
  const createUrl = "/admin/job";
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobContractType, setJobContractType] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobRemuneration, setJobRemuneration] = useState("");
  const [jobStartDate, setJobStartDate] = useState(null);
  const [jobSkills, setJobSkills] = useState("");
  const [jobCity, setJobCity] = useState("");
  const [jobCountry, setJobCountry] = useState("");
  const [jobCompany, setJobCompany] = useState("");
  const [jobCompanyDescription, setJobCompanyDescription] = useState("");
  const [jobCompanySite, setJobCompanySite] = useState("");
  const [alert, setAlert] = useState(null);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    if (match.path === updateUrl) {
      getAJob(match.params.id);
    }
  }, []);
  const onSubmit = e => {
    e.preventDefault();
    if (match.path === updateUrl) {
      const newJob = {};
      updateJob(match.params.id, newJob, history);
      setAlert({
        msg: "Les informations ont été modifiées !",
        type: "success",
        field: []
      });
      setTimeout(() => setAlert(null), 5000);
    }
    if (match.path === createUrl) {
      const newJob = {};
      createJob(newJob, history);
      setAlert({
        msg: "Le job a été créé avec succès !",
        type: "success",
        field: []
      });
      setTimeout(() => setAlert(null), 5000);
    }
  };
  const dissmissAlert = () => {
    this.setState({ isLoaded: false });
  };
  if (loading) {
    return <h1>Chargement...</h1>;
  }
  return (
    <Container className={classes.root}>
      <Alert alert={alert} />
      <ReturnButton history={history} />
      <Card>
        <CardHeader
          title={
            <Typography variant="h3" component="h3">
              Ajouter un job
            </Typography>
          }
        />
        <CardContent>
          <form className={classes.input} onSubmit={onSubmit}>
            <Typography variant="h5" component="h5">
              Poste
            </Typography>
            <TextField
              className={classes.input}
              aria-describedby="jobTitleHelp"
              label="Intitulé du poste"
              placeholder="Intitulé du poste"
              onChange={e => setJobTitle(e.target.value)}
              value={jobTitle}
              variant="outlined"
            />
            <TextField
              className={classes.input}
              aria-describedby="jobDescriptionHelp"
              label="Description du poste"
              placeholder="Description du poste"
              onChange={e => setJobDescription(e.target.value)}
              value={jobDescription}
              variant="outlined"
            />
            <FormControl variant="outlined" className={classes.input}>
              <InputLabel ref={inputLabel} htmlFor="jobDescription">
                Type de contrat
              </InputLabel>
              <NativeSelect
                value={jobContractType}
                onChange={e => setJobContractType(e.target.value)}
                input={
                  <OutlinedInput name="jobDescription" id="jobDescription" />
                }
              >
                <option value="" />
                <option value="stage">Stage</option>
                <option value="cdi">CDI</option>
                <option value="cdd">CDD</option>
                <option value="ca">Contrat d'apprentissage</option>
                <option value="cp">Contrat de professionnalisation</option>
              </NativeSelect>
            </FormControl>

            <FormControl variant="outlined" className={classes.input}>
              <InputLabel ref={inputLabel} htmlFor="jobType">
                Durée de travail
              </InputLabel>
              <NativeSelect
                value={jobType}
                onChange={e => setJobType(e.target.value)}
                input={
                  <OutlinedInput
                    name="jobType"
                    aria-describedby="jobTypeHelp"
                    placeholder="Durée de travail"
                  />
                }
              >
                <option value="" />
                <option value="temps-plein">Temps plein</option>
                <option value="temps-partiel">Temps partiel</option>
              </NativeSelect>
            </FormControl>

            <TextField
              className={classes.input}
              aria-describedby="jobRemunerationHelp"
              label="Rémunération"
              placeholder="Rémunération"
              onChange={e => setJobRemuneration(e.target.value)}
              value={jobRemuneration}
              variant="outlined"
            />
            <MuiPickersUtilsProvider utils={MomentUtils} locale="fr">
              <KeyboardDatePicker
                margin="normal"
                id="jobStartDate"
                label="Date de début"
                value={jobStartDate}
                onChange={setJobStartDate}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>

            <TextField
              className={classes.input}
              label="Compétences clés"
              id="jobSkills"
              name="jobSkills"
              aria-describedby="jobSkillsHelp"
              placeholder="Compétences clés"
              onChange={e => setJobSkills(e.target.value)}
              value={jobSkills}
              variant="outlined"
            />

            <Divider className={classes.divider} />
            <Typography variant="h5" component="h5">
              Localisation
            </Typography>
            <TextField
              className={classes.input}
              label="Ville"
              id="jobCity"
              name="jobCity"
              aria-describedby="jobCityHelp"
              placeholder="Ville"
              onChange={e => setJobCity(e.target.value)}
              value={jobCity}
              variant="outlined"
            />
            <FormControl variant="outlined" className={classes.input}>
              <InputLabel ref={inputLabel} htmlFor="jobCountry">
                Pays
              </InputLabel>
              <NativeSelect
                value={jobCountry}
                onChange={e => setJobCountry(e.target.value)}
                input={
                  <OutlinedInput
                    name="jobCountry"
                    aria-describedby="jobCountryHelp"
                    placeholder="Pays"
                  />
                }
              >
                <option value="" />
                <option value="france">France</option>
              </NativeSelect>
            </FormControl>
            <Divider className={classes.divider} />
            <Typography variant="h5" component="h5">
              Entreprise
            </Typography>
            <TextField
              className={classes.input}
              label="Nom de l'entreprise"
              id="jobCompany"
              name="jobCompany"
              aria-describedby="jobCompanyHelp"
              placeholder="Nom de l'entreprise"
              onChange={e => setJobCompany(e.target.value)}
              value={jobCompany}
              variant="outlined"
            />
            <TextField
              className={classes.input}
              multiline
              label="Description de l'entreprise"
              id="jobCompanyDescription"
              name="jobCompanyDescription"
              aria-describedby="jobCompanyDescriptionHelp"
              placeholder="Description de l'entreprise"
              onChange={e => setJobCompanyDescription(e.target.value)}
              value={jobCompanyDescription}
              variant="outlined"
            />
            <TextField
              className={classes.input}
              label="Site de l'entreprise"
              id="jobCompanySite"
              name="jobCompanySite"
              aria-describedby="jobCompanySiteHelp"
              placeholder="Site de l'entreprise"
              onChange={e => setJobCompanySite(e.target.value)}
              value={jobCompanySite}
              variant="outlined"
            />
            <Button className={classes.btn} variant="outlined">
              Ajouter un job
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

const mapStateToprops = state => ({
  jobs: state.jobs
});
export default connect(
  mapStateToprops,
  { getAJob, createJob, updateJob }
)(AddJob);
