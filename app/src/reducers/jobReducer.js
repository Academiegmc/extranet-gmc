import { GET_A_JOB, GET_ALL_JOBS, SEARCH_JOBS } from "../actions/types";

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
    case SEARCH_JOBS:
      return { ...state, isLoaded: false, search_jobs: action.payload };
    default:
      return state;
  }
};
