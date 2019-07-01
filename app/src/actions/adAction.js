import axios from "axios";
import {
  GET_ALL_ADS,
  GET_AN_AD,
  GET_ERRORS,
  SEARCH_ADS,
  DELETE_AD,
  GET_ALL_USER_ADS,
  CREATE_AD
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
export const getAllUserAd = userId => dispatch => {
  axios
    .get(`${adUrl}/user/${userId}`)
    .then(res => {
      dispatch({ type: GET_ALL_USER_ADS, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};
export const getAnAd = adId => dispatch => {
  axios
    .get(`${adUrl}/${adId}`)
    .then(ad => dispatch({ type: GET_AN_AD, payload: ad }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};
export const createAd = adData => async dispatch => {
  try {
    const res = await axios.post(adUrl, adData);
    dispatch({ type: CREATE_AD, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};
export const updateComments = (adID, comment) => dispatch => {
  axios
    .post(`${adUrl}/edit/${adID}/comments`, comment)
    .then(ad => dispatch({ type: GET_AN_AD, payload: ad }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};
export const updateAd = (adId, adData, history) => {
  axios
    .put(`${adUrl}/edit/${adId}`, adData)
    .then(ad => {
      history.push("/annonces");
    })
    .catch(err => console.error(err));
};
export const deleteAd = adId => dispatch => {
  axios
    .delete(`${adUrl}/${adId}`)
    .then(res => dispatch({ type: DELETE_AD, payload: adId }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const searchAd = adTitle => dispatch => {
  axios
    .get(`${adUrl}/title`, { params: { q: adTitle } })
    .then(res => dispatch({ type: SEARCH_ADS, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
