import React from "react";
import { Route } from "react-router-dom";
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
import App from "./App";
import { Footer } from "./components/layout/Footer";
const Routes = () => {
  return (
    <main>
      <Route path="/" component={App} />
      <Route exact path="/" component={Landing} />
      <Route exact path="/profile/:id" component={requireAuth(Profile)} />
      <Route exact path="/stage/:id" component={requireAuth(Stages)} />
      {/* <Route exact path="/profile/:id" component={Profile} /> */}
      <Route
        exact
        path="/trombinoscope"
        component={requireAuth(Trombinoscope)}
      />
      <Route exact path="/dashboard" component={requireAuth(Dashboard)} />
      <Route exact path="/annonce/:id" component={requireAuth(Annonce)} />
      <Route exact path="/news" component={requireAuth(News)} />
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
      <Footer />
    </main>
  );
};

export default Routes;
