import axios from "axios";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER, GET_ERRORS } from "./types";
import setAuthToken from "../utils/setAuthToken";
import { tokenType, userLoginUrl } from "../utils";
export const loginUser = (userData, history) => async dispatch => {
  try {
    const res = await axios.post(userLoginUrl, userData);
    //Save token in localstorage
    const { token } = res.data;
    await localStorage.setItem(tokenType, token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
    history.push("/dashboard");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logout = () => async dispatch => {
  await localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
