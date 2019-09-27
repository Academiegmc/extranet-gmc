import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import {} from "../../actions/usersAction";
import Slider from "react-slick";
import Moment from "react-moment";
import ReactModal from "react-modal";
import ReactMarkdown from "react-markdown";
import ReturnButton from "../layout/ReturnButton";
import { getUser } from "../../actions/usersAction";
import {
  Container,
  Grid,
  makeStyles,
  Typography,
  Divider,
  Card,
  CardContent
} from "@material-ui/core";
import { apiUrl } from "../../utils";
ReactModal.setAppElement(document.getElementById("root"));

const useStyles = makeStyles(theme => ({
  flex: {
    display: "flex",
    width: "100%",
    height: "50%"
  },
  grid: {
    display: "flex",
    flexFlow: "column wrap",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    [theme.breakpoints.up("md")]: {
      justifyContent: "space-between",
      flexFlow: "row wrap"
    }
  },
  item: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50%"
    }
  },
  portrait: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    [theme.breakpoints.up("md")]: {
      width: "150px",
      height: "150px"
    }
  },
  divider: {
    width: "100%"
  },
  cardContent: {
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "center",
    alignItems: "center"
  }
}));

const Stages = ({ users: { user }, history, match, loading, getUser }) => {
  const classes = useStyles();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [disallowedTypes, setDisallowedTypes] = useState([
    "image",
    "html",
    "inlineCode",
    "code"
  ]);
  const [stages, setStages] = useState([]);
  useEffect(() => {
    getUser(match.params.id);
  }, []);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (loading || user === null) {
    return <h1>Chargement...</h1>;
  }
  let status;
  let displayExperiences;
  let displayLetters;
  if (user.status === 0) status = "élève";
  if (user.status === 1) status = "Ancien élève";
  if (user.status === 2) status = "Professeur";
  if (user.status === 3) status = "Administrateur";
  if (user.letters !== undefined && user.letters.length > 0) {
    displayLetters = user.letters.map((letter, index) => (
      <a
        key={index}
        className="btn btn-link"
        href={`${apiUrl}/pdf/${letter.id}`}
      >
        {letter}
      </a>
    ));
  } else {
    displayLetters = <h3>Présentez-nous vos lettres de recommendations !</h3>;
  }
  if (user.experiences !== undefined && user.experiences.length > 0) {
    displayExperiences = user.experiences.map((exp, index) => (
      <li className="col-9" key={index}>
        <Typography variant="h6" className="text-justify p-2">
          {exp.poste}
        </Typography>
        <p className="text-justify p-2">{exp.name}</p>
        <ReactMarkdown
          className="text-justify p-2"
          source={exp.description}
          disallowedTypes={disallowedTypes}
        />
        <Typography variant="caption">
          Du{" "}
          <Moment locale="fr" format="DD MMMM YYYY">
            {exp.start_date}
          </Moment>{" "}
          au{" "}
          <Moment locale="fr" format="DD MMMM YYYY">
            {exp.end_date}
          </Moment>
        </Typography>
      </li>
    ));
  } else {
    displayExperiences = <span>Ajoutez des expériences</span>;
  }
  const settings = {
    adaptiveHeight: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  let recommendTab =
    user.letter &&
    user.letter.length &&
    user.letters.map(letter => (
      <div key={letter._id}>
        <blockquote className="">
          <p>{letter.text}</p>
          <i>{letter.author}</i>
        </blockquote>
      </div>
    ));
  return (
    <Container className={classes.flex} fixed>
      <Grid className={classes.grid} container>
        <Grid className={classes.item} item xs={12} md={3}>
          <ReturnButton history={history} />
          <Card>
            <CardContent className={classes.cardContent}>
              {user.profile_pic !== undefined && (
                <img
                  className={classes.portrait}
                  src={`${apiUrl}/api/users/image/user/${user.profile_pic._id}`}
                />
              )}
              <Typography variant="h6" component="h6">
                {user.name}
              </Typography>
              {user.status === 0 ? (
                <div className={classes.cardContent}>
                  <a
                    className="btn btn-primary"
                    href={
                      user.personal_sheet &&
                      `${apiUrl}/api/users/pdf/${user.personal_sheet._id}`
                    }
                  >
                    Fiche de renseignement
                  </a>
                  <a
                    className="btn btn-primary"
                    href={
                      user.convention &&
                      `${apiUrl}/api/users/pdf/${user.convention._id}`
                    }
                  >
                    Convention de stage
                  </a>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </Grid>
        <Grid className={classes.item} item xs={12} md={8}>
          <Card>
            <CardContent>
              {user.experiences && user.experiences.length > 0 ? (
                <Fragment>
                  <Typography variant="h5" commponent="h5">
                    Expériences
                  </Typography>
                  <ul>{displayExperiences}</ul>
                  <Divider className={classes.divider} />
                </Fragment>
              ) : (
                <Fragment>
                  <Typography variant="body1" commponent="p">
                    Ajoutez vos expériences !
                  </Typography>
                  <Divider className={classes.divider} />
                </Fragment>
              )}
              {user.letters.length > 0 ? (
                <Fragment>
                  <Typography variant="h5" component="h5">
                    Recommandations
                  </Typography>
                  <Slider {...settings}>{recommendTab}</Slider>
                </Fragment>
              ) : (
                <Typography variant="body1" commponent="p">
                  Demandez des lettres de recommandations à vos employeurs !
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = state => ({
  users: state.users
});
export default connect(
  mapStateToProps,
  { getUser }
)(Stages);
