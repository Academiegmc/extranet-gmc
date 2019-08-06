import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import data from "../../mock/trombinoscope.json";
import "./Trombinoscope.css";
import { getAllUsers } from "../../actions/usersAction";
import ReturnButton from "../layout/ReturnButton";
import {
  makeStyles,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider
} from "@material-ui/core";
import Breadcrumb from "../layout/Breadcrumb.js";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: "center"
  },
  grid: {
    display: "flex",
    flexFlow: "column wrap",
    [theme.breakpoints.up("sm")]: {
      flexFlow: "row wrap",
      justifyContent: "space-around"
    }
  },
  paper: {
    padding: theme.spacing(1, 2)
  },
  breadcrumb: {
    justifyContent: "center",
    flexWrap: "wrap"
  },
  card: {
    width: "auto",
    margin: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      width: "400px"
    }
  },
  img: {
    borderRadius: "50%",
    width: "200px",
    height: "200px",
    marginTop: theme.spacing(3)
  },
  text: {
    textAlign: "center"
  },
  divider: {
    border: "1px solid black",
    width: "100%",
    height: "100%"
  }
}));
const Trombinoscope = ({ history }) => {
  const classes = useStyles();
  const [users, setUsers] = useState(null);
  useEffect(() => {
    setUsers(data);
  }, []);
  if (users === null) return <h1>Chargement...</h1>;
  let status;
  const { administration, pedagogie } = users;
  const allUsers =
    administration !== undefined
      ? administration.map((user, index) => {
          if (user.status === 0) status = "élève";
          if (user.status === 1) status = "Ancien élève";
          if (user.status === 2) status = "Professeur";
          if (user.status === 3) status = "Administrateur";
          return (
            <Card key={index} className={classes.card}>
              <img
                className={classes.img}
                src={require(`../../assets/${user.image}`)}
                alt={`${user.name} ${index}`}
              />
              <CardContent>
                <Typography variant="h6" component="h6" className="title">
                  {user.name}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  className={classes.text}
                >
                  {user.fonction}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  className={classes.text}
                >
                  {status}
                </Typography>
              </CardContent>
            </Card>
          );
        })
      : null;
  const allPedago =
    pedagogie !== undefined
      ? pedagogie.map((user, index) => {
          if (user.status === 0) status = "élève";
          if (user.status === 1) status = "Ancien élève";
          if (user.status === 2) status = "Professeur";
          if (user.status === 3) status = "Administrateur";
          return (
            <Card key={index} className={classes.card}>
              <img
                className={classes.img}
                src={require(`../../assets/${user.image}`)}
                alt={`${user.name} ${index}`}
              />
              <CardContent>
                <Typography variant="h6" component="h6" className="title">
                  {user.name}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  className={classes.text}
                >
                  {user.fonction}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  className={classes.text}
                >
                  {status}
                </Typography>
              </CardContent>
            </Card>
          );
        })
      : null;
  const links = [{ title: "Trombinoscope", url: "/trombinoscope" }];
  return (
    <Container className={classes.root} fixed>
      <Grid container item xs={12}>
        <Grid item xs={12}>
          <Breadcrumb links={links} />
          <ReturnButton history={history} />
        </Grid>
        <Typography variant="h3" component="h3">
          Direction
        </Typography>
        <Grid className={classes.grid} item xs={12}>
          {allUsers}
        </Grid>
        <Divider className={classes.divider} />
        <Typography variant="h3" component="h3">
          Pédagogie
        </Typography>
        <Grid className={classes.grid} item xs={12}>
          {allPedago}
        </Grid>
      </Grid>
    </Container>
  );
};

Trombinoscope.propTypes = {
  users: PropTypes.object.isRequired,
  getAllUsers: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  users: state.users
});
export default connect(
  mapStateToProps,
  { getAllUsers }
)(Trombinoscope);
