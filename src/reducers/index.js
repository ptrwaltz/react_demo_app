import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import setting from "./setting";

export default combineReducers({
  auth,
  message,
  setting
});