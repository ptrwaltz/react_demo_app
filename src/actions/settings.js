import SettingsService from "../services/settings.service"
import { GET_SETTINGS_SUCCESS, GET_SETTINGS_FAIL, SET_MESSAGE,UPDATE_SETTING, UPDATE_SETTINGS_SUCCESS, UPDATE_SETTINGS_FAIL } from "./types";


export const getSettings = () => (dispatch) => {
    return SettingsService.getSettings().then((response) => {
        dispatch({
            type: GET_SETTINGS_SUCCESS,
            payload: response.data.data,
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
                type: GET_SETTINGS_FAIL,
                payload: message,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    )
}

export const updateSettingAction = (data) => async (dispatch) => {
    try {
      const res = await SettingsService.updateSettings(data);
  
      dispatch({
        type: UPDATE_SETTING,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };