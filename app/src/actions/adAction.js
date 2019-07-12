import axios from "axios";
import {
  GET_ALL_ADS,
  GET_AN_AD,
  GET_ERRORS,
  SEARCH_ADS,
  DELETE_AD,
  GET_ALL_USER_ADS,
  CREATE_AD,
  UPDATE_AD
} from "./types";
import { setLoading } from "./newsActions";
import { adUrl } from "../utils";
export const getAllAds = () => async dispatch => {
  try {
    setLoading();
    const res = await axios.get(adUrl);
    dispatch({ type: GET_ALL_ADS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};
export const getAllUserAd = userId => async dispatch => {
  try {
    setLoading();
    const res = await axios.get(`${adUrl}/user/${userId}`);
    dispatch({ type: GET_ALL_USER_ADS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.message.data });
  }
};
export const getAnAd = adId => async dispatch => {
  try {
    setLoading();
    const res = await axios.get(`${adUrl}/${adId}`);
    dispatch({ type: GET_AN_AD, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.message.data });
  }
};
export const createAd = adData => async dispatch => {
  try {
    setLoading();
    const res = await axios.post(adUrl, adData);
    dispatch({ type: CREATE_AD, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};
export const updateComments = (adID, comment) => async dispatch => {
  try {
    setLoading();
    const res = await axios.post(`${adUrl}/edit/${adID}/comments`, comment);
    dispatch({ type: UPDATE_AD, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.message.data });
  }
};
export const updateAd = (adId, adData, history) => async dispatch => {
  try {
    setLoading();
    const res = await axios.put(`${adUrl}/edit/${adId}`, adData);
    dispatch({ type: UPDATE_AD, payload: res.data });
    history.push("/annonces");
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.message.data });
  }
};
export const deleteAd = adId => async dispatch => {
  try {
    setLoading();
    await axios.delete(`${adUrl}/${adId}`);
    dispatch({ type: DELETE_AD, payload: adId });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const searchAd = adTitle => async dispatch => {
  try {
    setLoading();
    const res = await axios.get(`${adUrl}/title`, { params: { q: adTitle } });
    dispatch({ type: SEARCH_ADS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};
