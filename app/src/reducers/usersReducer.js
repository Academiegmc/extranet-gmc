import {
  GET_USERS,
  GET_USER,
  UPDATE_USER,
  GET_USER_ADS,
  GET_USER_JOBS,
  GET_USER_NEWS,
  DELETE_USER_ADS,
  DELETE_USER_JOBS,
  DELETE_USER_NEWS
} from "../actions/types";
const initialState = {
  users: null,
  user: null,
  userAds: null,
  userNews: null,
  userJobs: null,
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
        loading: false,
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
    case DELETE_USER_ADS:
      return {
        ...state,
        loading: false,
        userAds: state.userAds.filter(ad => ad.id !== action.payload)
      };
    case DELETE_USER_NEWS:
      return {
        ...state,
        loading: false,
        userNews: state.userNews.filter(news => news.id !== action.payload)
      };
    case DELETE_USER_JOBS:
      return {
        ...state,
        loading: false,
        userJobs: state.userJobs.filter(job => job.id !== action.payload)
      };
    default:
      return state;
  }
};
