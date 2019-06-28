import {
  GET_ALL_NEWS,
  GET_A_NEWS,
  DELETE_NEWS,
  GET_ALL_USER_NEWS,
  CREATE_NEWS,
  SET_LOADING
} from "../actions/types";
const initialState = {
  loading: false,
  news: null,
  newsTab: null,
  userNewsTab: null,
  errors: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_NEWS:
      return { ...state, loading: false, newsTab: action.payload };
    case GET_A_NEWS:
      return { ...state, loading: false, news: action.payload };
    case GET_ALL_USER_NEWS:
      return { ...state, loading: false, userNewsTab: action.payload };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case CREATE_NEWS:
      return {
        ...state,
        loading: false,
        newsTab: [...state, action.payload]
      };
    case DELETE_NEWS:
      return {
        ...state,
        newsTab: state.newsTab.filter(news => news.id !== action.payload)
      };
    default:
      return state;
  }
};
