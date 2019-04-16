import {
  GET_ALL_ADS,
  GET_AN_AD,
  SEARCH_ADS,
  DELETE_AD,
  GET_ALL_USER_ADS
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
    case GET_ALL_USER_ADS:
      return { ...state, ads: action.payload };
    case GET_AN_AD:
      return { ...state, isloading: false, ad: action.payload };
    case SEARCH_ADS:
      return { ...state, isloading: false, search_ads: action.payload };
    case DELETE_AD:
      return {
        ...state,
        ads: state.ads.filter(ad => ad.id !== action.payload)
      };
    default:
      return state;
  }
};
