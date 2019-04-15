import axios from "axios";
import { userUrl } from "../utils";
import {
  GET_USERS,
  GET_USER,
  GET_USER_ADS,
  GET_USER_NEWS,
  GET_USER_JOBS,
  GET_ERRORS,
  UPDATE_USER
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

export const getUser = userID => dispatch => {
  axios
    .get(`${userUrl}/${userID}`)
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

export const updateUser = (userData, authID, history) => dispatch => {
  let formData = new FormData();
  formData.append("name", userData.name);
  formData.append("poste", userData.poste);
  formData.append("description", userData.description);
  formData.append("start_date", userData.start_date);
  formData.append("end_date", userData.end_date);
  formData.append("old_password", userData.old_password);
  formData.append("new_password", userData.new_password);
  formData.append("profile_pic", userData.profile_pic);
  formData.append("renseignement", userData.fiche_renseignement);
  formData.append("convention", userData.convention_stage);
  formData.append("recommandation", userData.lettre_recommandation);
  axios
    .put(`${userUrl}`, formData)
    .then(res => {
      dispatch({ type: UPDATE_USER, payload: res.data });
      history.push(`/profile/${authID}`);
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};
