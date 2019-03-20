import {
  GET_A_JOB,
  GET_ALL_JOBS,
  SEARCH_JOBS,
  GET_ALL_USER_JOBS,
  DELETE_JOB
} from "../actions/types";

const initialState = {
  isLoaded: false,
  isSent: false,
  jobs: [],
  search_jobs: [],
  job: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_JOBS:
      return { ...state, isLoaded: false, jobs: action.payload };
    case GET_A_JOB:
      return { ...state, isLoaded: false, job: action.payload };
    case GET_ALL_USER_JOBS:
      return { ...state, jobs: action.payload };
    case DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter(job => job.id !== action.payload)
      };
    case SEARCH_JOBS:
      return { ...state, isLoaded: false, search_jobs: action.payload };
    default:
      return state;
  }
};
