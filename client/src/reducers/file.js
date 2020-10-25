import {
  FILE_GET,
  FILES_GET_BY_USER,
  FILES_GET_BY_FORM,
  FILE_UPLOAD,
  FILE_DELETE,
  FILE_ERROR,
} from "../actions/types";

const initialState = {
  loading: true,
  file: null,
  list: [],
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FILE_UPLOAD:
    case FILE_GET:
      return {
        ...state,
        file: payload,
        loading: false,
      };
    case FILES_GET_BY_USER:
    case FILES_GET_BY_FORM:
      return {
        ...state,
        list: payload,
        loading: false
      }
    case FILE_DELETE:
      return {
        ...state,
        file: null,
        loading: false,
      };
    case FILE_ERROR:
      return {
        file: null,
        list: [],
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
