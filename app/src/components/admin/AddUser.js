import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import {
  makeStyles,
  Container,
  Card,
  CardHeader,
  Typography,
  CardContent,
  TextField
} from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import { createUser } from "../../actions/usersAction";
import ReturnButton from "../layout/ReturnButton";

toast.configure();

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
    // padding: theme.spacing(1),
    // backgroundColor: "#C9B8B7",
    fontSize: "2rem",
    color: "white"
  }
}));
const AddUser = ({ history, auth, createUser }) => {
  const classes = useStyle();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(0);

  const marks = [
    {
      value: 0,
      label: "Elève"
    },
    {
      value: 1,
      label: "Ancien élève"
    },
    {
      value: 2,
      label: "Professeur"
    },
    {
      value: 3,
      label: "Admin"
    }
  ];

  const onSubmit = async e => {
    e.preventDefault();
    const userData = { name, password, email, status };
    const res = await createUser(userData);
    if (res.status === "success")
      toast("Utilisateur créé avec succès", { type: "success" });
    else
      toast("Une erreur est survenue lors de la création de l'utilisateur", {
        type: "error"
      });
  };
  const valuetext = value => {
    setStatus(value);
    return `${value}`;
  };
  let showForm;
  const { user } = auth;
  if (user.status !== 3) {
    showForm = (
      <Typography variant="h3">Vous n'avez pas accès à cette page !</Typography>
    );
  } else {
    showForm = (
      <Card>
        <CardHeader
          title={
            <Typography variant="h3" component="h3">
              Ajouter un utilisateur
            </Typography>
          }
        />
        <CardContent>
          <form
            className={classes.input}
            onSubmit={onSubmit}
            autoComplete="off"
          >
            <TextField
              className={classes.input}
              type="text"
              autoComplete="off"
              aria-describedby="name"
              label="Nom"
              placeholder="Nom de l'utilisateur"
              onChange={e => setName(e.target.value)}
              value={name}
              variant="outlined"
            />
            <TextField
              className={classes.input}
              autoComplete="off"
              type="password"
              aria-describedby="password"
              label="Mot de passe"
              placeholder="Mot de passe de l'utilisateur"
              onChange={e => setPassword(e.target.value)}
              value={password}
              variant="outlined"
            />
            <TextField
              className={classes.input}
              aria-describedby="email"
              type="email"
              label="Email"
              placeholder="Email de l'utilisateur"
              onChange={e => setEmail(e.target.value)}
              value={email}
              variant="outlined"
            />
            <Typography id="discrete-slider" gutterBottom>
              Statut
            </Typography>
            <Slider
              defaultValue={0}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={3}
            />
            <TextField
              className={classes.btn}
              variant="outlined"
              type="submit"
              value="Ajouter un utilisateur"
            />
          </form>
        </CardContent>
      </Card>
    );
  }
  return (
    <Container>
      <ReturnButton history={history} />
      {showForm}
    </Container>
  );
};

AddUser.propTypes = {
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { createUser }
)(AddUser);
