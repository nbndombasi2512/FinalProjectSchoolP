import React, { useState } from "react";
import CheckboxComponent from "./CheckboxComponent";
import styled from "styled-components";

const CoursesStructure = ({ courses }) => {
  const [state, setState] = useState([]);

  const handleChange = (e) => {
    const tempCoursesArray = [...state, e.target.value];
    setState(tempCoursesArray);
  };

  return (
    <>
      <span> {courses.year} </span>
      {courses &&
        courses.classes.map((course) => {
          return (
            <CheckboxComponent name={course} handleOnChange={handleChange} />
          );
        })}
      <Button onClick={() => console.log(state)}>SUBMIT</Button>
    </>
  );
};

const Button = styled.button`
  /* background-color: #86bc42; */
  color: #000;
  padding: 8px 35px;
  border: 1px solid #000;
  margin: 20px 10px 0 0;
  font-size: 14px;

  &:hover {
    cursor: pointer;
    color: #fff;
    background-color: #86bc42;
    border: transparent;
  }
`;

export default CoursesStructure;
