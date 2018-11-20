import axios from "axios";
import { userUrl } from "../utils";
import { GET_USERS, GET_ERRORS } from "./types";

export const getAllUsers = () => dispatch => {
  axios
    .get(`${userUrl}`)
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    )
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};

export const getUserAds = userId => dispatch => {};
export const getUserJobs = userId => dispatch => {};
export const getUserNews = userId => dispatch => {};
