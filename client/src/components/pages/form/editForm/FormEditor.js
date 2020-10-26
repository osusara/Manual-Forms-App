import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Col, Row, Form, Button, Modal } from "react-bootstrap";
import { updateForm, deleteForm, generatePDF } from "../../../../actions/form";
import QuestionTypes from "./questionTypes/QuestionTypes";

const FormEditor = ({ updateForm, deleteForm, form, setShow, show }) => {
  const [formData, setFormData] = useState(form);
  const [removeConfirm, setRemoveConfirm] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onselect = (e, id) => {
    const dataSet = formData.fields;
    dataSet[id].type = e.target.value;

    setFormData({ ...formData, fields: dataSet });
  };

  const onQuestionChange = (questionData) => {
    const dataSet = formData;
    dataSet.fields[questionData.id] = questionData;

    setFormData(dataSet);
  };

  const addNewField = () => {
    const existingFields = formData.fields;
    const fieldData = {
      id: existingFields.length,
      text: "New Question",
      type: "Short Answer",
      value: [],
    };

    existingFields.push(fieldData);
    setFormData({ ...formData, fields: existingFields });
  };

  const removeField = (id) => {
    const existingFields = formData.fields;
    const newList = [];
    let i = 0;
    existingFields.forEach((item) => {
      if (item.id !== id) {
        item.id = i;

        newList.push(item);
        i++;
      }
    });

    setFormData({ ...formData, fields: newList });
  };

  const deleteFormHandler = () => {
    deleteForm(formData._id);
    setRemoveConfirm(false);
    setShow(false);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    const data = {
      title: formData.title,
      description: formData.description,
      fields: formData.fields
    }

    updateForm(formData._id, data);
    setShow(false);
  };

  return (
    <Modal size="xl" show={show} onHide={() => setShow(false)}>
      <Form onSubmit={(e) => onSubmit(e)}>
        <Modal.Header closeButton className="bg-secondary">
          <h2>
            Edit <b>Form</b>
          </h2>
        </Modal.Header>
        <Modal.Body className="bg-secondary">
          <Card className="my-3 shadow-sm">
            <Card.Body>
              <h5>
                <Form.Control
                  value={formData.title}
                  name="title"
                  onChange={(e) => onChange(e)}
                  placeholder="Untitled Form"
                />
              </h5>
              <Form.Control
                size="sm"
                value={formData.description}
                name="description"
                onChange={(e) => onChange(e)}
                placeholder="Form description..."
              />
            </Card.Body>
          </Card>
          {formData.fields.map((question) => (
            <Card key={question.id} className="my-4 shadow-sm">
              <Card.Body>
                <Row className="mb-2">
                  <Col sm={3} xs={6} className="ml-auto">
                    <Form.Control
                      as="select"
                      defaultValue={question.type}
                      onChange={(e) => onselect(e, question.id)}
                      custom
                    >
                      <option vlaue="Short Answer">Short Answer</option>
                      <option vlaue="Checkbox">Checkbox</option>
                    </Form.Control>
                  </Col>
                </Row>
                <QuestionTypes
                  question={question}
                  onQuestionChange={onQuestionChange}
                  removeField={removeField}
                />
              </Card.Body>
            </Card>
          ))}
          <Card
            className="my-4 btn-light shadow-sm"
            style={{ width: "100%", cursor: "pointer" }}
            onClick={() => addNewField()}
          >
            <Card.Body>
              <h1 className="display-4 m-auto text-center text-dark">
                <i className="fas fa-plus"></i>
              </h1>
            </Card.Body>
          </Card>
          <RemoveConfirm
            removeConfirm={removeConfirm}
            setRemoveConfirm={setRemoveConfirm}
            deleteFormHandler={deleteFormHandler}
          />
        </Modal.Body>
        <Modal.Footer className="bg-secondary">
          <Button
            className="btn-dark mr-2 px-4 py-3"
            onClick={() => generatePDF(formData, formData._id)}
          >
            <h5 className="my-auto">Download Form</h5>
          </Button>
          <Button type="submit" className="btn-primary mr-2 px-4 py-3">
            <h5 className="my-auto">Save</h5>
          </Button>
          <Button
            className="btn-danger mr-2 px-4 py-3"
            onClick={() => setRemoveConfirm(!removeConfirm)}
          >
            <h5 className="my-auto">Delete</h5>
          </Button>
          <Button
            className="btn btn-secondary px-4 py-3"
            onClick={() => setShow(false)}
          >
            <h5 className="my-auto">Discard</h5>
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

const RemoveConfirm = ({
  removeConfirm,
  setRemoveConfirm,
  deleteFormHandler,
}) => (
  <Modal show={removeConfirm} onHide={() => setRemoveConfirm(false)} style={{ border: "none" }}>
    <Modal.Body>
      <h4 className="text-primary mt-2 text-center">Are you sure to delete this form?</h4>
      <div className="mb-3 text-center mx-auto">
        <Button
          className="btn btn-secondary shadow-sm px-3 mr-2 py-2"
          onClick={() => setRemoveConfirm(false)}
        >
          Cancel
        </Button>
        <Button
          className="btn btn-primary shadow-sm px-3 py-2"
          onClick={() => deleteFormHandler()}
        >
          Delete
        </Button>
      </div>
    </Modal.Body>
  </Modal>
);

FormEditor.protoType = {
  updateForm: PropTypes.func.isRequired,
  deleteForm: PropTypes.func.isRequired,
};

export default connect(null, { updateForm, deleteForm })(FormEditor);
