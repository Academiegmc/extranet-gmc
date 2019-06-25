import {
  GET_USERS,
  GET_USER,
  UPDATE_USER,
  GET_USER_ADS,
  GET_USER_JOBS,
  GET_USER_NEWS
} from "../actions/types";
const initialState = {
  users: [],
  user: {},
  userAds: [],
  userNews: [],
  userJobs: [],
  errors: null
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload
      };
    case GET_USER_ADS:
      return {
        ...state,
        userAds: action.payload
      };
    case GET_USER_JOBS:
      return {
        ...state,
        userJobs: action.payload
      };
    case GET_USER_NEWS:
      return {
        ...state,
        userNews: action.payload
      };
    default:
      return state;
  }
};
