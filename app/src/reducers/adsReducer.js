import {
  GET_ALL_ADS,
  GET_AN_AD,
  UPDATE_COMMENTS,
  SEARCH_ADS
} from "../actions/types";

const initialState = {
  isloading: false,
  isDeleted: false,
  ad: {},
  ads: [],
  search_ads: [],
  comments: [],
  comment: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ADS:
      return { ...state, isloading: false, ads: action.payload };
    case GET_AN_AD:
      return { ...state, isloading: false, ad: action.payload };
    case UPDATE_COMMENTS:
      return { ...state, comment: action.payload };
    case SEARCH_ADS:
      return { ...state, isloading: false, search_ads: action.payload };
    default:
      return state;
  }
};
