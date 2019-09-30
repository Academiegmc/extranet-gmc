import axios from "axios";
import { userUrl } from "../utils";
import {
  GET_USERS,
  GET_USER,
  GET_USER_ADS,
  GET_USER_NEWS,
  GET_USER_JOBS,
  GET_ERRORS,
  UPDATE_USER,
  DELETE_USER_NEWS,
  DELETE_USER_JOBS,
  DELETE_USER_ADS,
  CREATE_USER
} from "./types";
import { setLoading } from "./newsActions";

export const getAllUsers = () => async dispatch => {
  try {
    setLoading();
    const res = await axios.get(`${userUrl}/all`);
    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const getUser = userID => async dispatch => {
  try {
    setLoading();
    const res = await axios.get(`${userUrl}/${userID}`);
    dispatch({
      type: GET_USER,
      payload: res.data
    });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const getUserAds = userId => async dispatch => {
  try {
    setLoading();
    const url = `${userUrl}/${userId}/ads`;
    const res = await axios.get(url);
    dispatch({ type: GET_USER_ADS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};
export const getUserJobs = userId => async dispatch => {
  try {
    setLoading();
    const url = `${userUrl}/${userId}/jobs`;
    const res = await axios.get(url);
    dispatch({ type: GET_USER_JOBS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};
export const getUserNews = userId => async dispatch => {
  try {
    setLoading();
    const url = `${userUrl}/${userId}/news`;
    const res = await axios.get(url);
    dispatch({ type: GET_USER_NEWS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const deleteUserNews = newsId => async dispatch => {
  try {
    setLoading();
    const url = `${userUrl}/news/news/${newsId}`;
    const res = await axios.delete(url);
    dispatch({ type: DELETE_USER_NEWS, payload: newsId });
    return res.data;
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};
export const deleteUserJobs = jobId => async dispatch => {
  try {
    setLoading();
    const url = `${userUrl}/job/${jobId}`;
    const res = await axios.delete(url);
    dispatch({ type: DELETE_USER_JOBS, payload: jobId });
    return res.data;
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};
export const deleteUserAds = adId => async dispatch => {
  try {
    setLoading();
    const url = `${userUrl}/annonce/annonce/${adId}`;
    const res = await axios.delete(url);
    dispatch({ type: DELETE_USER_ADS, payload: adId });
    return res.data;
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const createUser = userData => async dispatch => {
  try {
    setLoading();
    const { name, email, password, status } = userData;
    const res = await axios.post(userUrl, { name, email, password, status });
    dispatch({ type: CREATE_USER, payload: res.data });
    return res.data;
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
    return error.response.data;
  }
};
export const updateUser = userData => async dispatch => {
  try {
    setLoading();
    let formData = new FormData();
    formData.append("company_name", userData.name);
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
    formData.append("author", userData.author);
    const res = await axios.put(`${userUrl}`, formData);
    dispatch({ type: UPDATE_USER, payload: res.data });
    return res.data;
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
    return error.response.data;
  }
};
