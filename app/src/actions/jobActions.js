import axios from "axios";
import {
  GET_A_JOB,
  GET_ALL_JOBS,
  UPDATE_JOB,
  DELETE_JOB,
  GET_ERRORS
} from "./types";
import { jobUrl } from "../utils";

export const getAllJobs = () => dispatch => {
  axios
    .get(jobUrl)
    .then(jobs =>
      dispatch({
        type: GET_ALL_JOBS,
        payload: jobs
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};
export const getAJob = jobId => dispatch => {
  axios
    .get(`${jobUrl}/${jobId}`)
    .then(job =>
      dispatch({
        type: GET_A_JOB,
        payload: job
      })
    )
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};
export const createJob = (jobData, history) => dispatch => {
  const jobboardLink = "/jobboard";
  axios
    .post(jobUrl, jobData)
    .then(history.push(jobboardLink))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};
export const updateJob = (jobId, jobData) => dispatch => {
  axios
    .put(`${jobUrl}/edit/${jobId}`, jobData)
    .then(jobUpdated => dispatch({ type: UPDATE_JOB, payload: jobUpdated }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};
export const deleteJob = jobId => dispatch => {
  axios
    .delete(`${jobUrl}/delete/${jobId}`)
    .then(res => dispatch({ type: DELETE_JOB, payload: res }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};
