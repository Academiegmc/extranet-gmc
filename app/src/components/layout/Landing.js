import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  // Snackbar,
  IconButton,
  Button,
  makeStyles,
  Container,
  Grid,
  TextField,
  InputAdornment,
  FormControl
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { loginUser } from "../../actions/authActions";
import Logo from "../../assets/logo.png";
import "./Landing.css";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  },
  textField: {
    flexBasis: 200
  },
  button: {
    padding: "1rem",
    fontFamily: "Lato",
    fontWeight: "500"
  },
  media: {
    margin: "auto"
  }
}));

// export default function SimpleSnackbar() {

// }
const Landing = ({ auth, errors, history, loginUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    console.log(auth);
    if (auth.isAuthenticated) history.push("/dashboard");
  }, []);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const onSubmit = e => {
    e.preventDefault();
    const userData = {
      email,
      password
    };
    loginUser(userData);
  };
  return (
    <Container styles={classes.root} maxWidth="md">
      <FormControl>
        <Grid container justify="center" alignItems="center" spacing={3}>
          <img className={classes.media} src={Logo} alt="Logo" />
          <Grid item xs={12}>
            <TextField
              id="email"
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
              label="Email"
              fullWidth
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="password"
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
              type={showPassword ? "text" : "password"}
              label="Mot de passe"
              fullWidth
              value={password}
              onChange={e => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="Toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className={classes.button}
              variant="contained"
              fullWidth
              style={{ backgroundColor: "#c9b8b7", color: "#fff" }}
              onClick={onSubmit}
            >
              Se connecter
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </Container>
    // <div className="container d-flex flex-column justify-content-center align-items-center mt-5 landing">
    //   <img src={Logo} className="mx-auto" alt="logo" />
    //   <hr />
    //   <form className="col-12 d-flex flex-column" onSubmit={onSubmit}>
    //     <div className="form-group">
    //       <label htmlFor="exampleInputEmail1">Email</label>
    //       <input
    //         type="email"
    //         className="form-control"
    //         id="email"
    //         name="email"
    //         aria-describedby="emailHelp"
    //         placeholder="Entrer votre email"
    //         onChange={e => setEmail(e.target.value)}
    //       />
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="exampleInputPassword1">Mot de passe</label>
    //       <input
    //         type="password"
    //         className="form-control"
    //         id="password"
    //         name="password"
    //         placeholder="Entrer votre mot de passe"
    //         onChange={e => setPassword(e.target.value)}
    //       />
    //     </div>
    //     <button type="submit" className="btn btn-primary">
    //       Connexion
    //     </button>
    //   </form>
    // </div>
  );
};

Landing.prototypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Landing);
