import axios from "axios";
import { userUrl } from "../utils";
import {
  GET_USERS,
  GET_USER,
  GET_USER_ADS,
  GET_USER_NEWS,
  GET_USER_JOBS,
  GET_ERRORS
} from "./types";

export const getAllUsers = () => dispatch => {
  axios
    .get(`${userUrl}/all`)
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    )
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response }));
};

export const getUser = () => dispatch => {
  axios
    .get(`${userUrl}`)
    .then(res =>
      dispatch({
        type: GET_USER,
        payload: res.data
      })
    )
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response }));
};

export const getUserAds = userId => dispatch => {
  const url = `${userUrl}/${userId}/ads`;
  axios
    .get(url)
    .then(ads => dispatch({ type: GET_USER_ADS, payload: ads }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response }));
};
export const getUserJobs = userId => dispatch => {
  const url = `${userUrl}/${userId}/jobs`;
  axios
    .get(url)
    .then(jobs => dispatch({ type: GET_USER_JOBS, payload: jobs }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response }));
};
export const getUserNews = userId => dispatch => {
  const url = `${userUrl}/${userId}/news`;
  axios
    .get(url)
    .then(news => dispatch({ type: GET_USER_NEWS, payload: news }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response }));
};

export const updateUser = userData => dispatch => {
  console.log(userData);
  axios
    .put(`${userUrl}`, userData)
    .then(res => {
      console.log(res.data);
      // dispatch({ type: UPDATE_USER, payload: res.data });
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};
