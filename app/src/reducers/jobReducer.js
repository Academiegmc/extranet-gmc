import {
  GET_A_JOB,
  GET_ALL_JOBS,
  SEARCH_JOBS,
  GET_ALL_USER_JOBS,
  DELETE_JOB,
  UPDATE_JOB,
  CREATE_JOB,
  SEND_JOB_APPLICATION
} from "../actions/types";

const initialState = {
  loading: false,
  isSent: false,
  jobs: [],
  search_jobs: null,
  job: null,
  errors: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_JOBS:
      return {
        ...state,
        loading: false,
        jobs: state.jobs.concat(action.payload)
      };
    case GET_A_JOB:
      return { ...state, loading: false, job: action.payload };
    case GET_ALL_USER_JOBS:
      return { ...state, jobs: action.payload };
    case CREATE_JOB:
      return {
        ...state,
        loading: false,
        jobs: [action.payload, ...state.jobs]
      };
    case UPDATE_JOB:
      return { ...state, loading: true, job: action.payload };
    case DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter(job => job.id !== action.payload)
      };
    case SEND_JOB_APPLICATION:
      return {
        ...state,
        loading: false,
        isSent: true
      };
    case SEARCH_JOBS:
      return { ...state, loading: false, jobs: action.payload };
    default:
      return state;
  }
};
