import axios from "axios";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER, GET_ERRORS, CLEAR_ERRORS } from "./types";
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
    dispatch({ type: CLEAR_ERRORS, payload: null });
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
  try {
    await localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  } catch (error) {
    console.error(error.response.data);
  }
};
