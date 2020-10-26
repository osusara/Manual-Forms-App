import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  PASSWORD_SUCCESS,
  PASSWORD_FAIL,
  LOGOUT,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  data: null,
  error: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        data: payload,
        loading: false,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case UPDATE_SUCCESS:
    case UPDATE_FAIL:
    case PASSWORD_FAIL:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case PASSWORD_SUCCESS:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        data: null,
        isAuthenticated: false,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        data: null,
        isAuthenticated: false,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
