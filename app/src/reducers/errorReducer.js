import { GET_ERRORS } from "../actions/types";
const initiaState = {
  errors: null,
  loading: false
};
export default (state = initiaState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return { ...state, loading: false, errors: action.payload };
    default:
      return state;
  }
};
