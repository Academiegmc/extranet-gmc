import axios from "axios";
import { GET_A_NEWS, GET_ALL_NEWS, GET_ERRORS, CREATE_NEWS } from "./types";
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
  axios
    .post(newsUrl, newsData)
    .then(res => history.push("/news"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};
export const updateNews = newsData => dispatch => {};
export const deleteNews = newsId => dispatch => {};
