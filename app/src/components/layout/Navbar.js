import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";

import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Link,
  Grid
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { logout } from "../../actions/authActions";
import { getUser } from "../../actions/usersAction";
import "./Navbar.css";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: "5%"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  text: {
    fontFamily: "Lato",
    color: "#6C6B6A"
  }
}));

const Navbar = ({ users, auth, logout, history }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const logoutUser = () => {
    logout();
    if (history) history.push("/");
    setAnchorEl(null);
  };

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  return (
    <nav className={classes.root}>
      <AppBar
        position="static"
        style={{ backgroundColor: "#f4e9de", height: "100%" }}
      >
        <Toolbar>
          <Typography
            className={`${classes.root} ${classes.title}`}
            variant="h6"
          >
            <Link component={RouterLink} to="/">
              Extranet
            </Link>
          </Typography>
          {auth.isAuthenticated && (
            <div style={{ flexGrow: 0.1 }}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                spacing={2}
              >
                <Typography className={classes.text} variant="h6">
                  <Link component={RouterLink} to="/">
                    Accueil
                  </Link>
                </Typography>
                <Typography className={classes.text} variant="h6">
                  <Link component={RouterLink} to="/jobboard">
                    Jobboard
                  </Link>
                </Typography>
                <Typography className={classes.text} variant="h6">
                  <Link component={RouterLink} to="/news">
                    News
                  </Link>
                </Typography>
                <Typography className={classes.text} variant="h6">
                  <Link component={RouterLink} to="/annonces">
                    Annonce
                  </Link>
                </Typography>
                <Typography className={classes.text} variant="h6">
                  <Link component={RouterLink} to="/trombinoscope">
                    Trombinoscope
                  </Link>
                </Typography>
                {auth.user.status === 3 && (
                  <Typography className={classes.text} variant="h6">
                    <Link component={RouterLink} to="/admin">
                      Admin
                    </Link>
                  </Typography>
                )}
                <IconButton
                  aria-label="Account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  style={{ color: "#6C6B6A" }}
                >
                  <AccountCircle />
                </IconButton>
              </Grid>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link component={RouterLink} to={`/profile/${auth.user.id}`}>
                    Mon Profil
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link component={RouterLink} to="/stage">
                    Stage
                  </Link>
                </MenuItem>
                <MenuItem onClick={logoutUser}>Déconnexion</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};
const mapStatetoprops = state => ({
  auth: state.auth,
  users: state.users
});
export default connect(
  mapStatetoprops,
  { logout, getUser }
)(Navbar);
