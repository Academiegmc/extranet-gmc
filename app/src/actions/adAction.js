import axios from "axios";
import {
  GET_ALL_ADS,
  GET_AN_AD,
  GET_ERRORS,
  UPDATE_AD,
  DELETE_AD,
  UPDATE_COMMENTS
} from "./types";
import { adUrl } from "../utils";
export const getAllAds = () => dispatch => {
  axios
    .get(adUrl)
    .then(ads => dispatch({ type: GET_ALL_ADS, payload: ads }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};
export const getAnAd = adId => dispatch => {
  axios
    .get(`${adUrl}/${adId}`)
    .then(ad => dispatch({ type: GET_AN_AD, payload: ad }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};
export const createAd = (adData, history) => dispatch => {
  const adsUrl = "/annonces";
  axios
    .post(adUrl, adData)
    .then(history.push(adsUrl))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};
export const updateComments = (adID, comment) => dispatch => {
  axios
    .post(`${adUrl}/edit/${adID}/comments`, comment)
    .then(ad => dispatch({ type: UPDATE_COMMENTS, payload: ad }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};
export const updateAd = adId => dispatch => {
  axios
    .put(`${adUrl}/${adId}`)
    .then(ad => dispatch({ type: UPDATE_AD, payload: ad }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};
export const deleteAd = adId => dispatch => {
  axios
    .delete(`${adUrl}/${adId}`)
    .then(res => dispatch({ type: DELETE_AD, payload: res }));
};
