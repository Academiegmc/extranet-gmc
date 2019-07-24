import axios from "axios";
import {
  GET_A_NEWS,
  GET_ALL_NEWS,
  GET_ERRORS,
  DELETE_NEWS,
  GET_ALL_USER_NEWS,
  CREATE_NEWS,
  SET_LOADING,
  ADD_COMMENT
} from "./types";
import { newsUrl } from "../utils";

export const setLoading = () => {
  return { type: SET_LOADING };
};
export const getAllNews = () => async dispatch => {
  try {
    setLoading();
    const res = await axios.get(newsUrl);
    dispatch({
      type: GET_ALL_NEWS,
      payload: res.data
    });
  } catch (error) {
    console.error(error);
    dispatch(error.response.data);
  }
};
export const getAllUserNews = userId => async dispatch => {
  try {
    setLoading();
    const res = await axios.get(`${newsUrl}/user/${userId}`);
    dispatch({
      type: GET_ALL_USER_NEWS,
      payload: res.data
    });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
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
export const createNews = newsData => async dispatch => {
  const { title, description, images } = newsData;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  if (images.length > 0) {
    if (images.length > 1) {
      for (let i = 0; i <= images.length; i++) {
        formData.append("images", images[i]);
      }
    } else formData.append("images", images[0]);
  }
  try {
    setLoading();
    const res = await axios.post(newsUrl, formData);
    dispatch({ type: CREATE_NEWS, payload: res.data });
  } catch (error) {
    console.error(error);
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};
export const updateNewsComments = (newsId, comment) => async dispatch => {
  console.log("TEXT", comment);
  try {
    setLoading();
    const res = await axios.post(`${newsUrl}/edit/${newsId}/comments`, comment);
    dispatch({ type: ADD_COMMENT, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.message.data });
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
