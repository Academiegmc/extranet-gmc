import { GET_ERRORS } from "../actions/types";
const initiaState = {
  errors: null
};
export default (state = initiaState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
