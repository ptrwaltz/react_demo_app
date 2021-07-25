import {
    UPDATE_SETTING
  } from "./types";

  import settingService from "../services/settings.service";

  export const updateTutorial = (data) => async (dispatch) => {
    try {
      const res = await settingService.updateSettings(data);
  
      dispatch({
        type: UPDATE_SETTING,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };