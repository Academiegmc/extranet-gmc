import { GET_ALL_NEWS, GET_A_NEWS } from "../actions/types";
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
    default:
      return state;
  }
};
