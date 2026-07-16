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
    <CourseList>
      <YearLabel>{courses.year}</YearLabel>
      {courses &&
        courses.classes.map((course) => {
          return (
            <CourseItem key={course}>
              <CheckboxComponent name={course} handleOnChange={handleChange} />
            </CourseItem>
          );
        })}
      <Button onClick={() => console.log(state)}>SUBMIT</Button>
    </CourseList>
  );
};

const CourseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const YearLabel = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: #86bc42;
  font-family: "Teko", sans-serif;
`;

const CourseItem = styled.div`
  width: 100%;

  .course-checkbox {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    width: 100%;
  }

  .course-checkbox label {
    display: flex;
    align-items: center;
    cursor: pointer;
    flex: 1;
  }
`;

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
