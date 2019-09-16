import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  IconButton,
  makeStyles,
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
    height: "300px",
    width: "100%",
    marginTop: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  item: {
    width: "80%",
    [theme.breakpoints.up("md")]: {
      width: "50%"
    }
  },
  margin: {
    margin: theme.spacing(1)
  },
  textField: {
    flexBasis: 200
  },
  button: {
    // padding: "1rem",
    fontFamily: "Lato",
    fontWeight: "500",
    // backgroundColor: "#c9b8b7",
    color: "#fff"
  },
  media: {
    margin: "auto",
    height: "150px"
  }
}));

const Landing = ({ auth, errors: { errors }, history, loginUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (errors === null && auth.isAuthenticated) history.push("/dashboard");
  }, [auth, errors]);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const onSubmit = e => {
    e.preventDefault();
    const userData = {
      email,
      password
    };
    loginUser(userData, history);
  };
  return (
    <form className={classes.root} onSubmit={onSubmit}>
      <div>
        <img className={classes.media} src={Logo} alt="Logo" />
      </div>
      <Grid item className={classes.item} xs={12}>
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
      <Grid item className={classes.item} xs={12}>
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
      <Grid item className={classes.item} xs={12}>
        <TextField
          className={clsx(classes.margin, classes.button)}
          variant="outlined"
          fullWidth
          type="submit"
          value="Se connecter"
        />
      </Grid>
    </form>
  );
};

const buttonStyle = { backgroundColor: "#c9b8b7", color: "#fff" };
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
