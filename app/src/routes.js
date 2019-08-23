import React, { useState, useEffect, Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Landing from "./components/layout/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import Annonce from "./components/annonce/Annonce";
import Annonces from "./components/annonces/Annonces";
import Job from "./components/job/Job";
import Jobboard from "./components/jobboard/Jobboard";
import AdminDashboard from "./components/admin/Dashboard";
import AddJob from "./components/admin/AddJob";
import AddNews from "./components/admin/AddNews";
import AddAnnonce from "./components/admin/AddAnnonce";
import News from "./components/news/News";
import NewsDescription from "./components/news/NewsDescription";
import Trombinoscope from "./components/trombinoscope/Trombinoscope";
import Profile from "./components/profile/Profile";
import Stages from "./components/stages/Stages";
import requireAuth from "./utils/requireAuth";
import ProfileForm from "./components/profile/ProfileForm";
import Markdown from "./components/markdown/Markdown";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";

const Routes = ({ errors: { errors }, auth }) => {
  const [alert, setAlert] = useState(null);
  useEffect(() => {
    console.log(errors);
    if (errors !== null) {
      setAlert({ msg: errors.message, type: "error", auth: false });
      // setTimeout(() => setAlert(null), 5000);
    }
  }, [errors]);

  return (
    <main style={{ height: "100vh", width: "100vw" }}>
      <Route
        path="/"
        render={props => (
          <Fragment>
            <Navbar {...props} />
            <Alert {...props} alert={alert} setAlert={setAlert} />
          </Fragment>
        )}
      />
      <Route exact path="/" component={Landing} />
      <Route exact path="/profile/:id" component={requireAuth(Profile)} />
      <Route exact path="/stage/:id" component={requireAuth(Stages)} />
      <Route
        exact
        path="/trombinoscope"
        component={requireAuth(Trombinoscope)}
      />
      <Route exact path="/markdown" component={requireAuth(Markdown)} />
      <Route exact path="/dashboard" component={requireAuth(Dashboard)} />
      <Route exact path="/annonce/:id" component={requireAuth(Annonce)} />
      {/* <Route exact path="/news" component={requireAuth(News)} /> */}
      <Route
        exact
        path="/news"
        render={props =>
          auth.isAuthenticated ? <News {...props} /> : <Redirect to="/" />
        }
      />
      <Route exact path="/news/:id" component={requireAuth(NewsDescription)} />
      <Route exact path="/annonces" component={requireAuth(Annonces)} />
      <Route exact path="/job/:id" component={requireAuth(Job)} />
      <Route exact path="/jobboard" component={requireAuth(Jobboard)} />
      <Route exact path="/admin" component={requireAuth(AdminDashboard)} />
      <Route exact path="/admin/job" component={requireAuth(AddJob)} />
      <Route exact path="/job/edit/:id" component={requireAuth(AddJob)} />
      <Route exact path="/news/edit/:id" component={requireAuth(AddNews)} />
      <Route
        exact
        path="/annonce/edit/:id"
        component={requireAuth(AddAnnonce)}
      />
      <Route exact path="/admin/annonce" component={requireAuth(AddAnnonce)} />
      <Route exact path="/admin/news" component={requireAuth(AddNews)} />
      <Route
        exact
        path="/profile/annonce"
        component={requireAuth(AddAnnonce)}
      />
      <Route exact path="/profile/news" component={requireAuth(AddNews)} />
      <Route exact path="/profile/job" component={requireAuth(AddJob)} />
      <Route
        exact
        path="/profile/edit/:id"
        component={requireAuth(ProfileForm)}
      />
    </main>
  );
};

Routes.propTypes = {
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  {}
)(Routes);
