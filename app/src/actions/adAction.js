import axios from "axios";
import { GET_ALL_ADS, GET_AN_AD, GET_ERRORS, UPDATE_COMMENTS } from "./types";
import { adUrl } from "../utils";
import { logout } from "./authActions";
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
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err });
      if (err.response.status === 403) {
        //Rediriger l'utilisateur vers la page de login après quelques secondes en l'avertissant au préalable
        logout();
        history.push("/");
      }
    });
};
export const updateComments = (adID, comment, history) => dispatch => {
  axios
    .post(`${adUrl}/edit/${adID}/comments`, comment)
    .then(ad => dispatch({ type: UPDATE_COMMENTS, payload: ad }))
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err });
      if (err.response.status === 403) {
        //Rediriger l'utilisateur vers la page de login après quelques secondes en l'avertissant au préalable
        logout();
        history.push("/");
      }
    });
};
export const updateAd = (adId, history) => {
  axios
    .put(`${adUrl}/${adId}`)
    .then(ad => {
      return ad.data;
    })
    .catch(err => {
      if (err.response.status === 403) {
        //Rediriger l'utilisateur vers la page de login après quelques secondes en l'avertissant au préalable
        logout();
        history.push("/");
      }
      return err;
    });
};
export const deleteAd = (adId, history) => {
  axios
    .delete(`${adUrl}/${adId}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      if (err.response.status === 403) {
        //Rediriger l'utilisateur vers la page de login après quelques secondes en l'avertissant au préalable
        logout();
        history.push("/");
      }
    });
};
