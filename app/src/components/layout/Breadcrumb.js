import React from "react";
import PropTypes from "prop-types";
import { Paper, Breadcrumbs, Link, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: "center"
  },
  paper: {
    padding: theme.spacing(1, 2),
    margin: theme.spacing(2)
  },
  breadcrumb: {
    justifyContent: "center",
    flexWrap: "wrap"
  },
  active: {
    color: "black",
    fontWeight: "700"
  }
}));

const Breadcrumb = ({ links }) => {
  const classes = useStyles();
  return (
    <Paper elevation={0} className={classes.paper}>
      <Breadcrumbs aria-label="Breadcrumb">
        <Link color="inherit" href="/">
          Extranet
        </Link>
        {links.map((link, index) => {
          if (links[index + 1] === undefined) {
            return (
              <Link
                key={index}
                className={classes.active}
                color="inherit"
                href={link.url}
              >
                {link.title}
              </Link>
            );
          } else {
            return (
              <Link key={index} color="inherit" href={link.url}>
                {link.title}
              </Link>
            );
          }
        })}
      </Breadcrumbs>
    </Paper>
  );
};

Breadcrumb.propTypes = {
  links: PropTypes.array.isRequired
};

export default Breadcrumb;
