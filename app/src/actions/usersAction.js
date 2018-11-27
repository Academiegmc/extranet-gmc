import axios from "axios";
import { userUrl } from "../utils";
import {
  GET_USERS,
  GET_USER_ADS,
  GET_USER_NEWS,
  GET_USER_JOBS,
  GET_ERRORS
} from "./types";

export const getAllUsers = () => dispatch => {
  axios
    .get(`${userUrl}`)
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    )
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response }));
};

export const getUserAds = (userId, history) => dispatch => {
  const url = `${userUrl}/${userId}/ads`;
  axios
    .get(url)
    .then(ads => dispatch({ type: GET_USER_ADS, payload: ads }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response }));
};
export const getUserJobs = (userId, history) => dispatch => {
  const url = `${userUrl}/${userId}/jobs`;
  axios
    .get(url)
    .then(jobs => dispatch({ type: GET_USER_JOBS, payload: jobs }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response }));
};
export const getUserNews = (userId, history) => dispatch => {
  const url = `${userUrl}/${userId}/news`;
  axios
    .get(url)
    .then(news => dispatch({ type: GET_USER_NEWS, payload: news }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response }));
};
