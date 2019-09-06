import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import bsCustomFileInput from "bs-custom-file-input";
import ReactMarkdown from "react-markdown";
import clsx from "clsx";
import { toast } from "react-toastify";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  makeStyles,
  TextField,
  Button,
  Link,
  Snackbar,
  SnackbarContent,
  Icon,
  Chip
} from "@material-ui/core";
import { CloudUpload, Done } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { green } from "@material-ui/core/colors";
import { getAJob, sendApplication } from "../../actions/jobActions";
import Axios from "axios";
import ReturnButton from "../layout/ReturnButton";
import Alert from "../layout/Alert";
import { logout } from "../../actions/authActions";
import Breadcrumb from "../layout/Breadcrumb";
import "./Job.css";
import "react-toastify/dist/ReactToastify.css";
import { apiUrl } from "../../utils";

toast.configure();

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  card: {
    flexGrow: 1,
    margin: theme.spacing(2)
  },
  cardHeader: {
    backgroundColor: "#2F4858",
    color: "white"
  },
  cardContent: {
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      flexFlow: "row wrap"
    }
  },
  cardContentInfos: {
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  grid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto"
  },
  gridItem: {
    display: "flex",
    flexFlow: "column wrap"
  },
  item: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row"
    }
  },
  divider: {
    visibility: "hidden",
    marginTop: "20px"
  },
  bigAvatar: {
    width: 100,
    height: 100
  },
  title: {
    color: "white"
  },
  subtitle: {
    textTransform: "capitalize",
    fontStyle: "italic",
    fontSize: "1rem"
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  chip: {
    margin: theme.spacing(1)
  },
  button: {
    padding: "1rem",
    fontFamily: "Lato",
    fontWeight: "500",
    backgroundColor: "#c9b8b7",
    color: "#fff"
  },
  rightIcon: {
    marginRight: 5
  },
  offerContent: {
    width: "70%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "auto",
    [theme.breakpoints.up("md")]: {
      width: "40%"
    }
  }
}));

const Job = ({
  auth: { user },
  jobs: { job, isSent },
  getAJob,
  sendApplication,
  logout,
  history,
  match,
  loading
}) => {
  const [lm, setLm] = useState("");
  const [cv, setCv] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = useState(null);
  const [disallowedTypes, setDisallowedTypes] = useState([
    "image",
    "html",
    "inlineCode",
    "code"
  ]);
  const classes = useStyles();
  useEffect(() => {
    getAJob(match.params.id);
    bsCustomFileInput.init();
  }, []);
  if (loading || job === null) {
    return <h3>Chargement...</h3>;
  }
  const onSubmit = async () => {
    // if (cv !== null || lm !== "") fileUpload(cv[0], lm, jobTitle, jobCompany);
    if (cv !== null && lm !== "") {
      const formData = new FormData();
      formData.append("jobCompany", jobCompany);
      formData.append("jobTitle", jobTitle);
      formData.append("lm", lm);
      formData.append("cv", cv[0]);
      const res = await sendApplication(id, formData);
      console.log(res);
      if (res.status === "success") {
        toast("Votre candidature a été envoyée avec succès !", {
          type: "success"
        });
        setCv(null);
        setLm("");
      } else {
        toast("Une erreur est survenue lors de l'envoi de votre CV.", {
          type: "error"
        });
      }
    }
  };
  const fileUpload = (file, lm, poste, agence) => {
    const url = "/api/jobs/application";
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const formData = new FormData();
    formData.append("agence", agence);
    formData.append("poste", poste);
    formData.append("lm", lm);
    formData.append("cv", file);
    Axios.post(apiUrl + url, formData, config)
      .then(res => {
        setOpen(true);
        setCv(null);
        setLm("");
        toast("Merci d'avoir postulé !", { type: "success" });
      })
      .catch(err => {
        console.log(err);
        toast("Une erreur est survenue lors de l'envoi de votre CV.", {
          type: "error"
        });
        if (err.response.status === 403) {
          //Rediriger l'utilisateur vers la page de login après quelques secondes en l'avertissant au préalable
          logout();
          history.push("/");
        }
      });
  };

  const {
    id,
    jobCompany,
    jobContractType,
    jobType,
    jobTitle,
    jobCity,
    jobCountry,
    jobCompanySite,
    jobRemuneration,
    jobCandidates,
    jobStartDate,
    jobDescription,
    jobCompanyDescription,
    jobSkills,
    createdAt
  } = job;
  let skills;
  const publishedDate = (
    <Moment fromNow ago locale="fr">
      {createdAt}
    </Moment>
  );
  if (jobSkills && jobSkills.length > 0) {
    skills = jobSkills.map((skill, index) => (
      <h5 style={{ display: "inline-block", margin: 2 }} key={index}>
        <span className="badge badge-secondary">{skill}</span>
      </h5>
    ));
  }
  const startDate = <Moment format="DD-MM-YYYY">{jobStartDate}</Moment>;
  const links = [
    { title: "Job Board", url: "/jobboard" },
    { title: job.jobTitle, url: `/job/${job.id}` }
  ];
  return (
    <Container>
      <Alert alert={alert} setAlert={setAlert} />
      <Breadcrumb links={links} />
      {/* <ReturnButton history={history} /> */}
      <Grid className={classes.grid} container>
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            title={
              <Typography variant="h5" component="h2">
                {jobTitle}
              </Typography>
            }
          />
          <CardContent className={classes.cardContent}>
            <Typography
              style={{ textTransform: "uppercase" }}
              variant="body2"
              component="p"
            >
              {jobContractType}
            </Typography>
            <Typography
              style={{ textTransform: "uppercase" }}
              variant="body2"
              component="p"
            >
              {`${jobCity}`}
            </Typography>
            <Typography
              style={{ textTransform: "uppercase" }}
              variant="body2"
              component="p"
            >
              {`${job.jobRemuneration}€ / mois`}
            </Typography>
          </CardContent>
        </Card>
        <Grid className={classes.item} item xs={12}>
          <Grid className={classes.gridItem} item xs={12}>
            <Card className={classes.card}>
              <CardHeader
                className={classes.cardHeader}
                title={
                  <Typography variant="h5" component="h2">
                    Description de l'entreprise
                  </Typography>
                }
              />
              <CardContent className={classes.cardContent}>
                <Typography
                  style={{ textTransform: "uppercase" }}
                  variant="body2"
                  component="p"
                >
                  <ReactMarkdown
                    source={jobCompanyDescription}
                    disallowedTypes={disallowedTypes}
                    linkTarget={"_blank"}
                  />
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardHeader
                className={classes.cardHeader}
                title={
                  <Typography variant="h5" component="h2">
                    Description du poste
                  </Typography>
                }
              />
              <CardContent className={classes.cardContent}>
                <Typography
                  style={{ textTransform: "uppercase" }}
                  variant="body2"
                  component="p"
                >
                  <ReactMarkdown
                    source={jobDescription}
                    disallowedTypes={disallowedTypes}
                    linkTarget={"_blank"}
                  />
                  {job.jobSkills.map((skill, index) => (
                    <Chip key={index} label={skill} className={classes.chip} />
                  ))}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid className={classes.cardContent} item xs={12}>
            <Card className={classes.card}>
              <CardHeader
                className={classes.cardHeader}
                title={
                  <Typography variant="h5" component="h2">
                    Informations sur l'entreprise
                  </Typography>
                }
              />
              <CardContent className={classes.cardContentInfos}>
                <Typography
                  style={{ textTransform: "uppercase" }}
                  variant="body2"
                  component="p"
                >
                  {jobCompany}
                </Typography>
                {jobCompanySite !== "" && (
                  <Link href={jobCompanySite}>{jobCompanySite}</Link>
                )}
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardHeader
                className={classes.cardHeader}
                title={
                  <Typography variant="h5" component="h2">
                    Postuler à cette offre
                  </Typography>
                }
              />
              <CardContent className={classes.cardContent}>
                {jobCandidates.includes(user.id) === false ? (
                  <Fragment>
                    <TextField
                      id="job-application"
                      label="Lettre de motivation"
                      multiline
                      rowsMax="4"
                      value={lm}
                      onChange={e => {
                        setLm(e.target.value);
                      }}
                      margin="normal"
                      placeholder="Rédiger votre lettre de motivation"
                      variant="outlined"
                      fullWidth
                    />
                    <input
                      accept="pdf/*"
                      className={classes.input}
                      id="cv"
                      name="cv"
                      type="file"
                      onChange={e => setCv(e.target.files)}
                    />
                    <label htmlFor="cv">
                      <Button variant="contained" component="span">
                        <CloudUpload className={classes.rightIcon} />
                        {`Ajouter votre CV`}
                      </Button>
                    </label>
                    <Button
                      className={classes.button}
                      onClick={onSubmit}
                      variant="contained"
                    >
                      Envoyer votre candidature
                    </Button>
                  </Fragment>
                ) : (
                  <div className={classes.offerContent}>
                    <h4>Déjà postulé !</h4>
                    <Done />
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      {open && (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
        >
          <SnackbarContent
            className={classes.success}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className={classes.message}>
                <CheckCircleIcon
                  className={clsx(classes.icon, classes.iconVariant)}
                />
                Merci d'avoir postulé !
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={() => setOpen(false)}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>
            ]}
          />
        </Snackbar>
      )}
    </Container>
  );
};

Job.propTypes = {
  getAJob: PropTypes.func.isRequired,
  sendApplication: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  jobs: state.jobs
});
export default connect(
  mapStateToProps,
  { getAJob, sendApplication }
)(Job);
