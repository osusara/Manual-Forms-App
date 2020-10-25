import {
  FORM_CREATE,
  FORM_UPDATE,
  FORM_DELETE,
  FORM_LOADED,
  FORMS_LOADED,
  FORM_ERROR,
} from "../actions/types";

const initialState = {
  loading: true,
  doc: null,
  list: [],
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FORMS_LOADED:
      return {
        ...state,
        list: payload,
        loading: false,
      };
    case FORM_LOADED:
    case FORM_CREATE:
    case FORM_UPDATE:
      return {
        ...state,
        doc: payload,
        loading: false,
      };
    case FORM_DELETE:
      return {
        ...state,
        list: state.list.filter((form) => form._id !== payload),
        doc: null,
        loading: false,
      };
    case FORM_ERROR:
      return {
        ...state,
        doc: null,
        list: [],
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
