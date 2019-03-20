import {
  GET_ALL_NEWS,
  GET_A_NEWS,
  DELETE_NEWS,
  GET_ALL_USER_NEWS
} from "../actions/types";
const initialState = {
  isloading: false,
  news: {},
  newsTab: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_NEWS:
      return { ...state, isloading: true, newsTab: action.payload };
    case GET_A_NEWS:
      return { ...state, isloading: true, news: action.payload };
    case GET_ALL_USER_NEWS:
      return { ...state, newsTab: action.payload };
    case DELETE_NEWS:
      return {
        ...state,
        newsTab: state.newsTab.filter(news => news.id !== action.payload)
      };
    default:
      return state;
  }
};
