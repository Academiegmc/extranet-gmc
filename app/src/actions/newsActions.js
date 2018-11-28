import axios from "axios";
import { GET_A_NEWS, GET_ALL_NEWS, GET_ERRORS } from "./types";
import { newsUrl } from "../utils";
export const getAllNews = () => dispatch => {
  axios.get(newsUrl).then(news =>
    dispatch({
      type: GET_ALL_NEWS,
      payload: news
    })
  );
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
export const updateNews = (newsId, newsData) => {
  axios.put(`${newsUrl}/${newsId}`, newsData).then(res => {
    return res.data;
  });
};
export const deleteNews = newsId => {
  axios.delete(`${newsUrl}/${newsId}`).then(res => {
    return res.data;
  });
};
