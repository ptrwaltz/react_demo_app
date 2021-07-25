import { GET_SETTINGS_FAIL, GET_SETTINGS_SUCCESS } from "../actions/types";

const initialState = {
    settings: {},
    loading: false,
    error: null
  };

export default function (state = initialState, action){
    const { type, payload } = action;
    switch (type) {
        case GET_SETTINGS_SUCCESS:
          return {
            ...state,
            loading: false,
            settings: payload
          };
        case GET_SETTINGS_FAIL:
          return {
            ...state,
            loading: false,
            error: payload.error,
            settings: {}
          };
        default:
          return state;
      }
}