import React from "react";
import { Row, Col, Spinner } from "react-bootstrap";

export default () => (
  <Row className="m-auto">
    <Col md={3} sm={6} xs={10} className="mx-auto my-5 text-center">
      <Spinner animation="border" />
    </Col>
  </Row>
);
