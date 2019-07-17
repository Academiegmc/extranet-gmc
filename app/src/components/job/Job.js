import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import bsCustomFileInput from "bs-custom-file-input";
import ReactMarkdown from "react-markdown";
import { getAJob } from "../../actions/jobActions";
import Axios from "axios";
import ReturnButton from "../layout/ReturnButton";
import { logout } from "../../actions/authActions";
import "./Job.css";
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
  Link
} from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
const useStyles = makeStyles(theme => ({
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
  }
}));
const Job = ({ jobs: { job }, getAJob, logout, history, match, loading }) => {
  const [lm, setLm] = useState("");
  const [cv, setCv] = useState(null);
  const [isSent, setIsSent] = useState(false);
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
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     lm: "",
  //     cv: null,
  //     isSent: false,
  //     job: {},
  //     disallowedTypes: ["image", "html", "inlineCode", "code"]
  //   };
  //   this.onSubmit = this.onSubmit.bind(this);
  //   onChange = onChange.bind(this);
  //   this.fileUpload = this.fileUpload.bind(this);
  // }
  // componentWillReceiveProps(nextProps) {
  //   this.setState(nextProps.jobs.job.data);
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     Object.keys(this.props.jobs.job).length > 0 &&
  //     this.props.jobs.job.constructor === Object &&
  //     !Object.is(this.props.jobs.job, prevProps.jobs.job)
  //   ) {
  //     this.setState({ job: this.props.jobs.job });
  //   }
  // }
  // componentDidMount() {
  //   this.props.getAJob(this.props.match.params.id);
  //   bsCustomFileInput.init();
  // }
  const onChange = e => {
    if (e.target.name === "cv") this.setState({ cv: e.target.files[0] });
    else this.setState({ [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    const { cv, lm, jobTitle, jobCompany } = this.state;
    this.fileUpload(cv, lm, jobTitle, jobCompany);
  };
  const fileUpload = (file, lm, poste, agence) => {
    const url = "/api/jobs/application";
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const formData = new FormData();
    formData.append("agence", agence);
    formData.append("poste", poste);
    formData.append("lm", lm);
    formData.append("cv", file);
    Axios.post(url, formData, config)
      .then(res => {
        this.setState({ isSent: true });
      })
      .catch(err => {
        if (err.response.status === 403) {
          //Rediriger l'utilisateur vers la page de login après quelques secondes en l'avertissant au préalable
          logout();
          history.push("/");
        }
      });
  };

  const {
    jobCompany,
    jobContractType,
    jobType,
    jobTitle,
    jobCity,
    jobCountry,
    jobCompanySite,
    jobRemuneration,
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
  console.log(job);
  return (
    <Container>
      <ReturnButton history={history} />
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
              Temps plein
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
                <TextField
                  id="job-application"
                  label="Lettre de motivation"
                  multiline
                  rowsMax="4"
                  value={lm}
                  onChange={e => {
                    setLm(e.target.value);
                  }}
                  // className={classes.textField}
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
                    {` Ajouter votre CV`}
                  </Button>
                </label>
                <Button variant="primary">Envoyer votre candidature</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
  // return (
  //   <div className="container mt-5 card rounded job">
  //     <ReturnButton history={history} />
  //     <div className="d-flex flex-column align-items-center w-100">
  //       <h3>{jobTitle}</h3>
  //       <h4>{jobCompany}</h4>
  //     </div>
  //     {/* Job infos */}
  //     <div className="d-flex flex-wrap">
  //       <div className="col-lg-4 col-md-4 col-xs-12">
  //         <p>
  //           {jobCity}, {jobCountry}
  //         </p>
  //         <p>{jobCompanySite}</p>
  //       </div>
  //       <div className="col-lg-4 col-md-4 col-xs-12">
  //         <p>{jobType}</p>
  //         <p>Rémunération: {jobRemuneration}</p>
  //       </div>
  //       <div className="col-lg-4 col-md-4 col-xs-12">
  //         <p>Date souhaité : {startDate} </p>
  //         <p> </p>
  //       </div>
  //     </div>

  //     <div className="d-inline-flex justify-content-between align-items-center text-white bg-dark w-100 p-2">
  //       <span className="font-weight-bold">
  //         {jobContractType !== undefined ? jobContractType.toUpperCase() : ""}
  //       </span>
  //       <span className="font-weight-bold">Publié il y a {publishedDate}</span>
  //     </div>

  //     <div className="row mt-5">
  //       {/* Offer */}
  //       <div className="col-6">
  //         <h4>Description de l'offre</h4>
  // <ReactMarkdown
  //   className=" text-justify"
  //   source={jobDescription}
  //   disallowedTypes={disallowedTypes}
  //   linkTarget={"_blank"}
  // />
  //       </div>
  //       {/* jobCompany */}
  //       <div className="col-6">
  //         <h4>Description de l'entreprise</h4>
  //         <ReactMarkdown
  //           className=" text-justify"
  //           source={jobCompanyDescription}
  //           disallowedTypes={disallowedTypes}
  //           linkTarget={"_blank"}
  //         />
  //       </div>
  //       {/* jobSkills */}
  //       <div className="col-6">
  //         <h4>Compétences clés</h4>
  //         <div className="text">{skills}</div>
  //       </div>
  //     </div>

  //     <div
  //       className="mt-3"
  //       style={{
  //         display: "flex",
  //         flexFlow: "column nowrap",
  //         justifyContent: "center",
  //         width: "100%"
  //       }}
  //     >
  //       <div>
  //         <h4>Envoyer votre candidature</h4>
  //       </div>
  //       <form encType="multipart/form-data" onSubmit={onSubmit}>
  //         {/* Lettre de Motivation */}
  //         <div className="form-group input-group">
  //           <div className="input-group-prepend">
  //             <span className="input-group-text">
  //               <i className="fas fa-pencil-alt" />
  //             </span>
  //           </div>
  //           <textarea
  //             className="form-control"
  //             placeholder="Motivation*"
  //             name="lm"
  //             onChange={e=>setLm(e.target.value)}
  //             required
  //           />
  //         </div>
  //         {/* CV */}
  //         <div className="input-group mb-3">
  //           <div className="input-group-prepend">
  //             <span className="input-group-text" id="inputGroupFileAddon01">
  //               <i className="fas fa-upload" />
  //             </span>
  //           </div>
  //           <div className="custom-file">
  //             <input
  //               type="file"
  //               className="custom-file-input"
  //               id="cv"
  //               name="cv"
  //               required
  //               aria-describedby="inputGroupFileAddon01"
  //               onChange={e=>setCv(e.target.files[0])}
  //             />
  //             <label
  //               htmlFor="cv"
  //               className="custom-file-label"
  //               data-browse="Parcourir"
  //             >
  //               Choisir un fichier
  //             </label>
  //           </div>
  //         </div>
  //         <p>
  //           <small>Type de fichier autorisé: .pdf Taille maximum : 2Mo.</small>
  //         </p>
  //         <div className="form-group">
  //           <button className="btn btn-primary" style={{ width: "100%" }}>
  //             Envoyer
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // );
};

Job.propTypes = {
  getAJob: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  jobs: state.jobs
});
export default connect(
  mapStateToProps,
  { getAJob }
)(Job);
