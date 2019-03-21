import axios from "axios";
import {
  GET_A_JOB,
  GET_ALL_JOBS,
  GET_ERRORS,
  SEARCH_JOBS,
  GET_ALL_USER_JOBS,
  DELETE_JOB,
  UPDATE_JOB
} from "./types";
import { jobUrl } from "../utils";
import { logout } from "./authActions";

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
export const getAllUserJobs = userId => dispatch => {
  axios
    .get(`${jobUrl}/user/${userId}`)
    .then(res =>
      dispatch({
        type: GET_ALL_USER_JOBS,
        payload: res.data
      })
    )
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};
export const getAJob = jobId => dispatch => {
  axios
    .get(`${jobUrl}/${jobId}`)
    .then(job =>
      dispatch({
        type: GET_A_JOB,
        payload: job.data
      })
    )
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};
export const createJob = (jobData, history) => dispatch => {
  const jobboardLink = "/jobboard";
  axios
    .post(jobUrl, jobData)
    .then(history.push(jobboardLink))
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err });
      if (err.response.status === 403) {
        //Rediriger l'utilisateur vers la page de login après quelques secondes en l'avertissant au préalable
        logout();
        history.push("/");
      }
    });
};
export const updateJob = (jobId, jobData, history) => dispatch => {
  axios
    .put(`${jobUrl}/edit/${jobId}`, jobData)
    .then(jobUpdated => {
      dispatch({ type: UPDATE_JOB, payload: jobUpdated });
      // const message = "Job modifié !";
      // return { success: true, data: jobUpdated, message };
    })
    .catch(err => {
      console.error(err.response.data);
      dispatch({ type: GET_ERRORS, payload: err.response.data });
      // logout();
      // history.push("/");
    });
};
export const deleteJob = jobId => dispatch => {
  axios
    .delete(`${jobUrl}/${jobId}`)
    .then(res => dispatch({ type: DELETE_JOB, payload: jobId }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const searchJob = jobTitle => dispatch => {
  axios
    .get(`${jobUrl}/search`, {
      params: { q: jobTitle }
    })
    .then(job => {
      console.log("Data:", job.data);
      dispatch({ type: SEARCH_JOBS, payload: job.data });
    })
    .catch(err => {
      console.error(err);
      return err.response;
    });
};
