import { GET_ALL_ADS, GET_AN_AD, UPDATE_COMMENTS } from "../actions/types";

const initialState = {
  isloading: false,
  isDeleted: false,
  ad: {},
  ads: [],
  comments: [],
  comment: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ADS:
      return { ...state, isloading: true, ads: action.payload };
    case GET_AN_AD:
      return { ...state, isloading: true, ad: action.payload };
    case UPDATE_COMMENTS:
      return { ...state, comment: action.payload };
    default:
      return state;
  }
};
