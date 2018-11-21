import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import store from "./store";

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

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import Navbar from "./components/layout/Navbar";
import Trombinoscope from "./components/trombinoscope/Trombinoscope";
import Profile from "./components/profile/Profile";
class App extends Component {
  componentDidMount = () => {
    if (
      localStorage.jwtToken &&
      localStorage.jwtToken !== "" &&
      localStorage.jwtToken !== "undefined"
    ) {
      setAuthToken(localStorage.jwtToken);
      const decoded = jwt_decode(localStorage.jwtToken);
      store.dispatch(setCurrentUser(decoded));
    }
  };

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/profile/:id" component={Profile} />
            <Route exact path="/trombinoscope" component={Trombinoscope} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/annonce/:id" component={Annonce} />
            <Route exact path="/news" component={News} />
            <Route exact path="/news/:id" component={NewsDescription} />
            <Route exact path="/annonces" component={Annonces} />
            <Route exact path="/job/:id" component={Job} />
            <Route exact path="/jobboard" component={Jobboard} />
            <Route exact path="/admin" component={AdminDashboard} />
            <Route exact path="/admin/job" component={AddJob} />
            <Route exact path="/job/edit/:id" component={AddJob} />
            {/* <Route exact path="/news/edit" component={AddJob} /> */}
            {/* <Route exact path="/ad/edit" component={AddJob} /> */}
            <Route exact path="/admin/ad" component={AddAnnonce} />
            <Route exact path="/admin/news" component={AddNews} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
