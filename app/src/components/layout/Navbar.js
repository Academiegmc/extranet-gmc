import React, { Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";

import { fade, makeStyles } from "@material-ui/core/styles";
import MoreIcon from "@material-ui/icons/MoreVert";
import {
  Work,
  Group,
  EventNote,
  NewReleases,
  Home,
  AccountCircle
} from "@material-ui/icons";
import {
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu
} from "@material-ui/core";

import { logout } from "../../actions/authActions";
import { getUser } from "../../actions/usersAction";
import Logo from "../../assets/logo.png";
import "./Navbar.css";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    margin: 2,
    color: "#717171",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  links: {
    textDecoration: "none"
  },
  active: {
    borderBottom: "1px solid"
  }
}));

const Navbar = ({ users, auth, logout, history }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const activeLink = clsx(classes.links, classes.active);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const menuId = "primary-search-account-menu";
  // console.log(history.location.pathname);
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <RouterLink
          className={classes.links}
          style={{ color: "inherit" }}
          to={`/profile/${auth.isAuthenticated ? auth.user.id : ""}`}
        >
          Profil
        </RouterLink>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <RouterLink
          className={classes.links}
          style={{ color: "inherit" }}
          to={`/stage`}
        >
          Stage
        </RouterLink>
      </MenuItem>
      <MenuItem
        onClick={() => {
          logout();
          setAnchorEl(null);
        }}
      >
        Déconnexion
      </MenuItem>
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <IconButton aria-label="Show 4 new mails" color="inherit">
          <Home />
        </IconButton>
        <RouterLink className={classes.links} to="/">
          <p style={{ color: "black" }}>Accueil</p>
        </RouterLink>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <IconButton aria-label="Show 11 new notifications" color="inherit">
          <NewReleases />
        </IconButton>
        <RouterLink
          className={
            history.location.pathname === "/news" ? activeLink : classes.links
          }
          to="/news"
        >
          <p style={{ color: "black" }}>News</p>
        </RouterLink>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <IconButton aria-label="Show 11 new notifications" color="inherit">
          <Work />
        </IconButton>
        <RouterLink className={classes.links} to="/jobboard">
          <p style={{ color: "black" }}>Job Board</p>
        </RouterLink>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <IconButton aria-label="Show 11 new notifications" color="inherit">
          <EventNote />
        </IconButton>
        <RouterLink className={classes.links} to="/annonces">
          <p style={{ color: "black" }}>Annonces</p>
        </RouterLink>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <IconButton aria-label="Show 11 new notifications" color="inherit">
          <Group />
        </IconButton>
        <RouterLink className={classes.links} to="/trombinoscope">
          <p style={{ color: "black" }}>Trombinoscope</p>
        </RouterLink>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="Account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profil</p>
      </MenuItem>
    </Menu>
  );
  return (
    <div className={classes.grow}>
      <AppBar style={{ backgroundColor: "#f4e9de" }} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Open drawer"
          >
            <Avatar alt="AGMC logo" src={Logo} className={classes.bigAvatar} />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Extranet
          </Typography>

          <div className={classes.grow} />
          {auth.isAuthenticated && (
            <Fragment>
              <div className={classes.sectionDesktop}>
                <RouterLink
                  className={
                    history.location.pathname === "/dashboard"
                      ? activeLink
                      : classes.links
                  }
                  to="/"
                >
                  <Typography className={classes.title} variant="h6" noWrap>
                    Accueil
                  </Typography>
                </RouterLink>
                <RouterLink
                  className={
                    history.location.pathname === "/jobboard"
                      ? activeLink
                      : classes.links
                  }
                  to="/jobboard"
                >
                  <Typography className={classes.title} variant="h6" noWrap>
                    Job Board
                  </Typography>
                </RouterLink>
                <RouterLink
                  className={
                    history.location.pathname === "/news"
                      ? activeLink
                      : classes.links
                  }
                  to="/news"
                >
                  <Typography className={classes.title} variant="h6" noWrap>
                    News
                  </Typography>
                </RouterLink>
                <RouterLink
                  className={
                    history.location.pathname === "/annonces"
                      ? activeLink
                      : classes.links
                  }
                  to="/annonces"
                >
                  <Typography className={classes.title} variant="h6" noWrap>
                    Annonces
                  </Typography>
                </RouterLink>
                <RouterLink
                  className={
                    history.location.pathname === "/trombinoscope"
                      ? activeLink
                      : classes.links
                  }
                  to="/trombinoscope"
                >
                  <Typography className={classes.title} variant="h6" noWrap>
                    Trombinoscope
                  </Typography>
                </RouterLink>
                <IconButton
                  edge="end"
                  aria-label="Account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                >
                  <AccountCircle />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="Show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
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
