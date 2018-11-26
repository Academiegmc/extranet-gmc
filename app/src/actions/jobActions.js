import axios from "axios";
import { GET_A_JOB, GET_ALL_JOBS, GET_ERRORS } from "./types";
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
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err });
      if (err.response.status === 403) {
        //Rediriger l'utilisateur vers la page de login après quelques secondes en l'avertissant au préalable
        logout();
        history.push("/");
      }
    });
};
export const updateJob = (jobId, jobData) => {
  axios.put(`${jobUrl}/edit/${jobId}`, jobData).then(jobUpdated => {
    return jobUpdated;
  });
};
export const deleteJob = jobId => {
  axios.delete(`${jobUrl}/${jobId}`).then(res => {
    return res.data;
  });
};
