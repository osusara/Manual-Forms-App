import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { uploadFile } from "../../../../actions/file";

const FormUploader = ({ uploadFile, list }) => {
  const [form, setForm] = useState(null);
  const [files, setFiles] = useState(null);

  const onChange = (e) => {
    setFiles(e.target.files);
  };

  const onSelect = (e) => {
    setForm(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (files && form) uploadFile(files, form);
  };

  return (
    <Container fluid={true}>
      <h2 className="text-dark">
        Upload <b>Form</b>
      </h2>
      <Row>
        <Col sm={6} className="mx-auto">
          <Card className="my-3 shadow-sm">
            <Card.Body>
              <Form onSubmit={(e) => onSubmit(e)}>
                <Form.Group>
                  <Form.Label>Select the Related Form</Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    required
                    onChange={(e) => onSelect(e)}
                  >
                    <option hidden value={null}>
                      Select the Form
                    </option>
                    {list.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.title}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.File required multiple onChange={(e) => onChange(e)} />
                </Form.Group>
                <Form.Group className="text-center">
                  <Button type="submit" className="btn-primarytext-center">
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

FormUploader.protoType = {
  uploadFile: PropTypes.func.isRequired,
};

export default connect(null, { uploadFile })(FormUploader);
