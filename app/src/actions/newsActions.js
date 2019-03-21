import axios from "axios";
import {
  GET_A_NEWS,
  GET_ALL_NEWS,
  GET_ERRORS,
  DELETE_NEWS,
  GET_ALL_USER_NEWS
} from "./types";
import { newsUrl } from "../utils";
export const getAllNews = () => dispatch => {
  axios.get(newsUrl).then(news =>
    dispatch({
      type: GET_ALL_NEWS,
      payload: news
    })
  );
};
export const getAllUserNews = userId => dispatch => {
  axios
    .get(`${newsUrl}/user/${userId}`)
    .then(res =>
      dispatch({
        type: GET_ALL_USER_NEWS,
        payload: res.data
      })
    )
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};
export const getANews = newsId => dispatch => {
  axios.get(`${newsUrl}/${newsId}`).then(news => {
    dispatch({
      type: GET_A_NEWS,
      payload: news
    });
  });
};
export const createNews = (newsData, history) => dispatch => {
  const { title, description, images } = newsData;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  if (images) {
    if (images.length > 1) {
      for (let i = 0; i <= images.length; i++) {
        formData.append("images", images[i]);
      }
    } else formData.append("images", images);
  }
  axios
    .post(newsUrl, formData)
    .then(res => history.push("/news"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};
export const updateNews = (newsId, newsData, history) => dispatch => {
  const { title, description, images } = newsData;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  if (images) {
    if (images.length > 1) {
      for (let i = 0; i <= images.length; i++) {
        formData.append("images", images[i]);
      }
    } else {
      formData.append("images", images);
    }
  }
  axios
    .put(`${newsUrl}/${newsId}`, formData)
    .then(res => {
      history.push("/news");
      return res.data;
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};
export const deleteNews = newsId => dispatch => {
  axios
    .delete(`${newsUrl}/${newsId}`)
    .then(res => dispatch({ type: DELETE_NEWS, payload: newsId }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};
