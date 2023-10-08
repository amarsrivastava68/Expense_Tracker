import React, { useState } from "react";

import Button from "../../UI/Button/Button";
import "./CourseInput.css";

const CourseInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isvalid, setisvalid] = useState(false);

  const goalInputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setisvalid(false);
      return;
    }
    setisvalid(true);
    props.onAddGoal(enteredValue);
  };

  const buttonClickHandler = () => {
    if (enteredValue.trim().length === 0) {
      setisvalid(false);
    } else {
      setisvalid(true);
    }
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={`form-control ${!isvalid ? "invalid" : ""}`}>
        <label>Course Goal</label>
        <input
          type="text"
          onChange={goalInputChangeHandler}
        />
      </div>
      <Button
        type="submit"
        className={`form-control ${!isvalid ? "invalid-button" : ""}`}
        onClick={buttonClickHandler}
      >
        Add Goal
      </Button>
    </form>
  );
};

export default CourseInput