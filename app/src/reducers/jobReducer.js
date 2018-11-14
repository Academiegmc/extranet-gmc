import { GET_A_JOB, GET_ALL_JOBS } from "../actions/types";

const initialState = {
  isLoaded: false,
  isSent: false,
  jobs: [],
  job: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_JOBS:
      return { ...state, isLoaded: true, jobs: action.payload };
    case GET_A_JOB:
      return { ...state, isLoaded: true, job: action.payload };
    default:
      return state;
  }
};
