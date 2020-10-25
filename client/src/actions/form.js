import axios from "axios";
import { jsPDF } from "jspdf";
import { setAlert } from "./alert";
import formIdBox from "../assets/form-id-box.png"
import shortAnswerBox from "../assets/short-answer-box.png"
import checkBox from "../assets/check-box.png"
import {
  FORM_CREATE,
  FORM_UPDATE,
  FORM_DELETE,
  FORM_ERROR,
  FORM_LOADED,
  FORMS_LOADED,
} from "./types";

export const createForm = (formData) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/form", formData, config);
    generatePDF(formData, res.data._id);

    dispatch({
      type: FORM_CREATE,
      payload: res.data,
    });

    dispatch(getForms());
    dispatch(setAlert("Form Created", "success"));
  } catch (error) {
    dispatch({
      type: FORM_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const generatePDF = (formData, formId) => {
  const { title, description, fields } = formData;

  const doc = new jsPDF();
  let docName;

  !title || title.replace(/ /g, "") === ""
    ? (docName = "Untitled Document.pdf")
    : (docName = title + ".pdf");

  doc.setFontSize(10);
  doc.text(formId, 145, 20);
  doc.addImage(formIdBox, 145, 22, 45, 5);

  doc.setFontSize(18);
  doc.text(title, 20, 35);

  doc.setFontSize(11);
  doc.text(description, 20, 40);

  let y = 55;
  fields.forEach((field) => {
    doc.text(`${field.id + 1}. ${field.text}`, 20, y);
    y += 7;

    if (field.type === "Checkbox") {
      field.value.forEach((value) => {
        doc.addImage(checkBox, 25, y - 3, 3, 3);
        doc.text(value.text, 29, y);
        y += 5;
      });
    } else {
      doc.addImage(shortAnswerBox, 25, y - 5, 160, 7);
      y += 5;
    }
    y += 5;
  });

  doc.save(docName);
}

export const getForm = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/form/${id}`);

    dispatch ({
      type: FORM_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: FORM_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
}

export const getForms = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/form");

    dispatch({
      type: FORMS_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FORM_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const updateForm = (id, formData) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.put(`/api/form/${id}`, formData, config);

    dispatch({
      type: FORM_UPDATE,
      payload: res.data,
    });

    dispatch(getForms());
    dispatch(setAlert("Form Updated", "success"));
  } catch (error) {
    dispatch({
      type: FORM_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteForm = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/form/${id}`);

    dispatch({
      type: FORM_DELETE,
      payload: id,
    });

    dispatch(getForms());
    dispatch(setAlert("Form Deleted", "warning"));
  } catch (error) {
    dispatch({
      type: FORM_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
}
