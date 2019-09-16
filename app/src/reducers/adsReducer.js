import {
  GET_ALL_ADS,
  GET_AN_AD,
  SEARCH_ADS,
  DELETE_AD,
  GET_ALL_USER_ADS,
  CREATE_AD,
  UPDATE_AD
} from "../actions/types";

const initialState = {
  loading: false,
  isDeleted: false,
  ad: null,
  ads: [],
  search_ads: null,
  comments: [],
  comment: null,
  errors: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ADS:
      return { ...state, loading: false, ads: action.payload };
    case GET_ALL_USER_ADS:
      return { ...state, loading: false, ads: action.payload };
    case GET_AN_AD:
      return { ...state, loading: false, ad: action.payload };
    case SEARCH_ADS:
      return { ...state, loading: false, ads: action.payload };
    case CREATE_AD:
      return {
        ...state,
        loading: false,
        ads: [...state.ads, action.payload.ad]
      };
    case UPDATE_AD:
      return {
        ...state,
        loading: false,
        ad: action.payload.ad
      };
    case DELETE_AD:
      return {
        ...state,
        ads: state.ads.filter(ad => ad.id !== action.payload)
      };
    default:
      return state;
  }
};
