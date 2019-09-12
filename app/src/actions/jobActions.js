import axios from "axios";
import {
  GET_A_JOB,
  GET_ALL_JOBS,
  GET_ERRORS,
  SEARCH_JOBS,
  GET_ALL_USER_JOBS,
  DELETE_JOB,
  UPDATE_JOB,
  CREATE_JOB,
  SEND_JOB_APPLICATION
} from "./types";
import { jobUrl } from "../utils";
import { logout, setCurrentUser } from "./authActions";
import { setLoading } from "./newsActions";
export const getAllJobs = () => async dispatch => {
  try {
    setLoading();
    const res = await axios.get(jobUrl);
    dispatch({
      type: GET_ALL_JOBS,
      payload: res.data
    });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};
export const getAllUserJobs = userId => async dispatch => {
  try {
    setLoading();
    const res = await axios.get(`${jobUrl}/user/${userId}`);
    dispatch({
      type: GET_ALL_USER_JOBS,
      payload: res.data
    });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};
export const getAJob = jobId => async dispatch => {
  try {
    setLoading();
    const res = await axios.get(`${jobUrl}/${jobId}`);
    dispatch({
      type: GET_A_JOB,
      payload: res.data
    });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};
export const createJob = jobData => async dispatch => {
  try {
    setLoading();
    const res = await axios.post(jobUrl, jobData);
    dispatch({ type: CREATE_JOB, payload: res.data.job });
    return res.data;
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
    return error.response.data;
  }
};
export const updateJob = (jobId, jobData) => async dispatch => {
  try {
    setLoading();
    const res = await axios.put(`${jobUrl}/edit/${jobId}`, jobData);
    dispatch({ type: UPDATE_JOB, payload: res.data.job });
    return res.data;
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
    return error.response.data;
  }
};
export const deleteJob = jobId => async dispatch => {
  try {
    setLoading();
    const res = await axios.delete(`${jobUrl}/${jobId}`);
    dispatch({ type: DELETE_JOB, payload: jobId });
    return res.data;
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
    return error.response.data;
  }
};

export const searchJob = (jobTitle, jobContractType) => async dispatch => {
  try {
    setLoading();
    const res = await axios.get(`${jobUrl}/search`, {
      params: { q: jobTitle, contractType: jobContractType }
    });
    dispatch({ type: SEARCH_JOBS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const sendApplication = (jobId, jobData) => async dispatch => {
  try {
    setLoading();
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await axios.post(
      `${jobUrl}/${jobId}/application`,
      jobData,
      config
    );
    dispatch({ type: SEND_JOB_APPLICATION, payload: res.data });
    return res.data;
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
    return error.response.data;
  }
};
