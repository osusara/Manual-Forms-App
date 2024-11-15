import React, { useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { Pie } from "react-chartjs-2";

const FormStatistics = ({ list }) => {
  const [form, setForm] = useState(null);

  const dataSet = [
    {
      type: "Checkbox",
      values: {
        labels: ["Highly Satisfying", "Mildly Satisfying", "Not Satisfying"],
        datasets: [
          {
            data: [0, 66.66, 33.34],
            backgroundColor: ["#00b0ff", "#576264"],
          },
        ],
      },
    },
    {
      type: "Checkbox",
      values: {
        labels: ["High Difficulty", "Standard Difficulty", "Low Difficulty"],
        datasets: [
          {
            data: [66.66, 33.34, 0],
            backgroundColor: ["#00b0ff", "#576264"],
          },
        ],
      },
    },
    {
      type: "Shortanswers",
      values: ["4", "0", "3"],
    },
    {
      type: "Shortanswers",
      values: ["No the time was not enough", "yes", "No"],
    },
    {
      type: "Shortanswers",
      values: ["50", "86", "45"],
    }
  ];

  const dummyData = {
    checkBoxData: {
      labels: ["Statement 1", "Statement 2", "Statement 3"],
      datasets: [
        {
          data: [25, 35, 40],
          backgroundColor: ["#00b0ff", "#576264"],
        },
      ],
    },
    shortAnswerData: ["Answer 1", "This is answer 2", "And this is 3"],
  };

  const onSelect = (e) => {
    const formData = list.filter((item) => item._id === e.target.value);
    setForm(formData[0]);
  };

  return (
    <Container fluid={true}>
      <h2 className="text-dark">
        Form <b>Statistics</b>
      </h2>
      <Row>
        <Col sm={6} className="mx-auto">
          <Card className="my-3 shadow-sm">
            <Card.Body>
              <Form.Group>
                <Form.Label>Select a form to get statistics</Form.Label>
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {form ? (
        <>
          <h2 className="text-center">
            <b>{form.title}</b> Form Statistics
          </h2>
          <Row>
            {form.fields.map((field) =>
              field.type === "Checkbox" ? (
                <Col md={6} xs={12} className="my-3">
                  <Card style={{ height: "100%" }}>
                    <Card.Body>
                      <h5>
                        {field.id + 1}. {field.text}
                      </h5>
                      {dataSet[field.id].type === "Checkbox" ? (
                        <Pie data={dataSet[field.id].values} />
                      ) : (
                        <Pie data={dummyData.checkBoxData} />
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ) : (
                <Col md={6} xs={12} className="my-3">
                  <Card style={{ height: "100%" }}>
                    <Card.Body>
                      <h5>
                        {field.id + 1}. {field.text}
                      </h5>
                      <div className="ml-4 mt-3 mr-2 mb-2">
                        {dataSet[field.id].type === "Shortanswers"
                          ? dataSet[field.id].values.map((answer) => (
                              <p>{answer}</p>
                            ))
                          : dummyData.shortAnswerData.map((answer) => (
                              <p>{answer}</p>
                            ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              )
            )}
          </Row>
        </>
      ) : (
        ""
      )}
    </Container>
  );
};

export default FormStatistics;
