import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";
import "./index.css";
import "moment/locale/fr";
import * as serviceWorker from "./serviceWorker";
import store from "./store";
import Routes from "./routes";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";

if (
  localStorage.jwtToken &&
  localStorage.jwtToken !== "" &&
  localStorage.jwtToken !== "undefined"
) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
