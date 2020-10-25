import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

const Checkbox = ({ question, onQuestionChange, removeField }) => {
  const [questionData, setQuestionData] = useState({
    id: question.id,
    text: question.text,
    type: question.type,
    value: [
      { id: 0, text: "Statement 1" },
      { id: 1, text: "Statement 2" },
      { id: 2, text: "Statement 3" },
    ],
  });

  const [editData, setEditData] = useState(false);

  // useEffect(() => {
  //   onQuestionChange(questionData);
  // }, [onQuestionChange, questionData]);

  const onChange = (e) =>
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });

  const onStatementChange = (e, id) => {
    const valueSet = questionData.value;
    valueSet[id].text = e.target.value;

    setQuestionData({ ...questionData, value: valueSet });
  };

  // const onCheckboxChange = (e, id) => {
  //   const valueSet = questionData.value;
  //   valueSet[id].isChecked = e.target.checked;

  //   setQuestionData({ ...questionData, value: valueSet });
  // };

  const onSave = () => {
    onQuestionChange(questionData);
    setEditData(false);
  };

  return (
    <>
      {editData ? (
        <>
          <h5>
            <Form.Control
              type="text"
              value={questionData.text}
              name="text"
              onChange={(e) => onChange(e)}
            />
          </h5>
          <Row className="my-3">
            {questionData.value.map((item) => (
              <Col key={item.id} md={3}>
                <Row>
                  <Col md={1}>
                    <Form.Control
                      custom
                      size="lg"
                      className="m-2"
                      type="checkbox"
                      // checked={item.isChecked}
                      disabled
                      name={item.text}
                      // onChange={(e) => onCheckboxChange(e, item.id)}
                    />{" "}
                  </Col>
                  <Col md={10}>
                    <Form.Control
                      size="sm"
                      type="text"
                      value={item.text}
                      name="text"
                      onChange={(e) => onStatementChange(e, item.id)}
                    />
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
          <div className="text-right">
            <Button
              className="btn-primary btn-sm ml-auto mt-2"
              onClick={() => onSave()}
            >
              Save
            </Button>
          </div>
        </>
      ) : (
        <>
          <h5>{questionData.text}</h5>
          <Row className="my-3">
            {questionData.value.map((item) => (
              <Col key={item.id} md={3}>
                <Form.Control
                  custom
                  className="m-2"
                  size="lg"
                  type="checkbox"
                  // checked={item.isChecked}
                  name={item.text}
                  disabled
                />{" "}
                <label>{item.text}</label>
              </Col>
            ))}
          </Row>
          <div className="text-right">
            <Button
              className="btn-dark btn-sm ml-auto mr-2 mt-2"
              onClick={() => setEditData(true)}
            >
              Edit
            </Button>
            <Button
              className="btn-danger btn-sm ml-auto mt-2"
              onClick={() => removeField(questionData.id)}
            >
              Delete
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default Checkbox;
