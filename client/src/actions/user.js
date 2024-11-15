import axios from "axios";
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
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

// Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) setAuthToken(localStorage.token);

  try {
    const res = await axios.get("/api/user");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register user
export const register = ({ firstname, lastname, email, password }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ firstname, lastname, email, password });

  try {
    const res = await axios.post("/api/user/reg", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/user", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Update user
export const update = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(formData);

  try {
    const res = await axios.put("/api/user", body, config);

    dispatch({
      type: UPDATE_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert("Profile Updated", "success"));
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: UPDATE_FAIL,
    });
  }
};

// Change password
export const editPassword = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(formData);

  try {
    const res = await axios.put("/api/user/password", body, config);

    dispatch({
      type: PASSWORD_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert("Password Changed", "success"));
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: PASSWORD_FAIL,
    });
  }
}

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
