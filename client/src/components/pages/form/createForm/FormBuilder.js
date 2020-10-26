import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Col, Container, Row, Form, Button, Nav } from "react-bootstrap";
import { createForm } from "../../../../actions/form";
import QuestionTypes from "./questionTypes/QuestionTypes";

const FormBuilder = ({ createForm }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fields: [],
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onselect = (e, id) => {
    const dataSet = formData.fields;
    dataSet[id].type = e.target.value;

    setFormData({ ...formData, fields: dataSet });
  };

  const onQuestionChange = (questionData) => {
    const dataSet = {...formData};
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
    setFormData({ ...formData, fields: existingFields});
  }

  const removeField = (id) => {
    const existingFields = formData.fields;
    const newList = [];
    let i = 0;
    existingFields.forEach(item => {
      if (item.id !== id) {
        item.id = i;
        newList.push(item);
        i++;
      }
    });

    setFormData({ ...formData, fields: newList });
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      fields: [],
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    createForm(formData);

    setFormData({
      title: "",
      description: "",
      fields: [],
    });
  }

  return (
    <Container fluid={true}>
      <h2 className="text-dark">
        Create <b>Form</b>
      </h2>
      <Row>
        <Col xs={10}>
          <Form onSubmit={(e) => onSubmit(e)}>
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
            <div>
              <Button type="submit" className="btn-primary px-4 py-3">
                <h5 className="my-auto">Save</h5>
              </Button>
              <Button
                className="btn-secondary px-4 ml-2 py-3"
                onClick={() => resetForm()}
              >
                <h5 className="my-auto">Clear</h5>
              </Button>
            </div>
          </Form>
        </Col>
        <Col xs={2}>
          <Card className="bg-light">
            <Card.Body>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link className="text-center bg-light py-4">
                    <h1 className="display-3 m-auto text-dark">
                      <i className="fas fa-plus-square"></i>
                    </h1>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="text-center bg-light py-4">
                    <h1 className="display-3 m-auto text-dark">
                      <i className="fas fa-plus-square"></i>
                    </h1>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="text-center bg-light py-4">
                    <h1 className="display-3 m-auto text-dark">
                      <i className="fas fa-plus-square"></i>
                    </h1>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="text-center bg-light py-4">
                    <h1 className="display-3 m-auto text-dark">
                      <i className="fas fa-plus-square"></i>
                    </h1>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

FormBuilder.protoType = {
  createForm: PropTypes.func.isRequired,
};

export default connect(null, { createForm })(FormBuilder);
