import axios from "axios";
import {
  GET_A_NEWS,
  GET_ALL_NEWS,
  GET_ERRORS,
  DELETE_NEWS,
  GET_ALL_USER_NEWS,
  CREATE_NEWS,
  SET_LOADING
} from "./types";
import { newsUrl } from "../utils";

export const setLoading = () => {
  return { type: SET_LOADING };
};
export const getAllNews = () => dispatch => {
  setLoading();
  axios.get(newsUrl).then(news =>
    dispatch({
      type: GET_ALL_NEWS,
      payload: news
    })
  );
};
export const getAllUserNews = userId => dispatch => {
  setLoading();
  axios
    .get(`${newsUrl}/user/${userId}`)
    .then(res =>
      dispatch({
        type: GET_ALL_USER_NEWS,
        payload: res.data
      })
    )
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
export const getANews = newsId => dispatch => {
  setLoading();
  axios.get(`${newsUrl}/${newsId}`).then(news => {
    dispatch({
      type: GET_A_NEWS,
      payload: news
    });
  });
};
export const createNews = (newsData, history) => async dispatch => {
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
  try {
    setLoading();
    const res = await axios.post(newsUrl, formData);
    dispatch({ type: CREATE_NEWS, payload: res.data });
    history.push("/news");
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
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
  setLoading();
  axios
    .put(`${newsUrl}/${newsId}`, formData)
    .then(res => {
      history.push("/news");
      return res.data;
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};
export const deleteNews = newsId => dispatch => {
  setLoading();
  axios
    .delete(`${newsUrl}/${newsId}`)
    .then(res => dispatch({ type: DELETE_NEWS, payload: newsId }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};
