import React from "react";

import ShortAnswer from "./ShortAnswer";
import Checkbox from "./Checkbox";
import Invalid from "./Invalid";

const QuestionTypes = ({ question, onQuestionChange, removeField }) => {
  switch (question.type) {
    case "Short Answer":
      return (
        <ShortAnswer
          question={question}
          onQuestionChange={onQuestionChange}
          removeField={removeField}
        />
      );
    case "Checkbox":
      return (
        <Checkbox
          question={question}
          onQuestionChange={onQuestionChange}
          removeField={removeField}
        />
      );
    default:
      return <Invalid />;
  }
};
export default QuestionTypes;
