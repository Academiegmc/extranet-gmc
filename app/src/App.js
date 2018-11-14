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
import AddJob from "./components/admin/AddJob";
import AddNews from "./components/admin/AddNews";
import AddAnnonce from "./components/admin/AddAnnonce";
import News from "./components/news/News";
import NewsDescription from "./components/news/NewsDescription";

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
class App extends Component {
  constructor(props) {
    super(props);
  }
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
            <Route exact path="/" component={Landing} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/annonce/:id" component={Annonce} />
            <Route exact path="/news" component={News} />
            <Route exact path="/news/:id" component={NewsDescription} />
            <Route exact path="/annonces" component={Annonces} />
            <Route exact path="/job/:id" component={Job} />
            <Route exact path="/jobboard" component={Jobboard} />
            <Route exact path="/admin/job" component={AddJob} />
            <Route exact path="/admin/news" component={AddNews} />
            <Route exact path="/admin/annonce" component={AddAnnonce} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
