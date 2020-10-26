import axios from "axios";
import { setAlert } from "./alert";
import {
  FILE_GET,
  FILES_GET_BY_USER,
  FILES_GET_BY_FORM,
  FILE_UPLOAD,
  FILE_DELETE,
  FILE_ERROR,
} from "./types";

export const uploadFile = (files, form) => async (dispatch) => {
  const formData = new FormData();
  formData.append("form", form);
  
  for (let file of files) {
    formData.append("filesList", file);
  }

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const res = await axios.post("/api/file", formData, config);

    dispatch({
      type: FILE_UPLOAD,
      payload: res.data,
    });

    dispatch(getFilesByUser());
    dispatch(setAlert("Files uploaded", "success"));
  } catch (error) {
    dispatch({
      type: FILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getFile = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/file/${id}`);

    dispatch({
      type: FILE_GET,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getFilesByUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/file/user");

    dispatch({
      type: FILES_GET_BY_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getFilesByForm = (formId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/file/form/${formId}`);

    dispatch({
      type: FILES_GET_BY_FORM,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteFile = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/file/${id}`);

    dispatch({
      type: FILE_DELETE,
      payload: id,
    });

    dispatch(getFilesByUser());
    dispatch(setAlert("File Deleted", "warning"));
  } catch (error) {
    dispatch({
      type: FILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
}
