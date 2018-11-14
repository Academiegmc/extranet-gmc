import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import newsReducer from "./newsReducer";
import jobReducer from "./jobReducer";
import adsReducer from "./adsReducer";
export default combineReducers({
  auth: authReducer,
  news: newsReducer,
  jobs: jobReducer,
  ads: adsReducer,
  errors: errorReducer
});
