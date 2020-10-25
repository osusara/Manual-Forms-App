import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const ShortAnswer = ({ question, onQuestionChange, removeField }) => {
  const [questionData, setQuestionData] = useState({
    id: question.id,
    text: question.text,
    type: question.type,
    value: [],
  });

  const [editData, setEditData] = useState(false);

  // useEffect(() => {
  //   onQuestionChange(questionData);
  // }, [onQuestionChange, questionData]);

  const onChange = (e) =>
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });

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
          <Form.Control
            type="text"
            // value={questionData.value}
            name="value"
            // onChange={(e) => onChange(e)}
            disabled
          />
          <div className="text-right">
            <Button
              className="btn-primary btn-sm mt-2"
              onClick={() => onSave()}
            >
              Save
            </Button>
          </div>
        </>
      ) : (
        <>
          <h5>{questionData.text}</h5>
          <Form.Control
            type="text"
            // value={questionData.value}
            name="value"
            disabled
          />
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

export default ShortAnswer;
