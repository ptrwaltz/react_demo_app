import UserService from "../services/user.service";
import {
  ALLUSER_SUCCESS,
  ALLUSER_FAIL,
  PROFILE_SUCCESS,
  PROFILE_FAIL,
  SET_MESSAGE,
} from "./types";


export const updateProfile = (firstName, lastName) => (dispatch) => {
  return UserService.updateProfile(firstName, lastName).then(
    (response) => {
      dispatch({
        type: PROFILE_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: PROFILE_FAIL,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};