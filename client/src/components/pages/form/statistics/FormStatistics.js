import React from 'react'
import { Container, Row, Col, Card } from "react-bootstrap";

const FormStatistics = () => {
  return (
    <Container fluid={true}>
      <h2 className="text-dark">
        Form <b>Statistics</b>
      </h2>
      <Row>
        <Col sm={6} className="mx-auto">
          <Card className="my-3 shadow-sm">
            <Card.Body>"Statistics" Is Under Construction...</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FormStatistics;
