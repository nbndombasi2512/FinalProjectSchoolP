import React from "react";
import styled from "styled-components";

const DisplayGrades = ({ grade }) => {
  return (
    <Wrapper>
      <div>
        <span className="grades">{grade?.student._id}</span>
        <span className="grades">
          {grade?.student.firstName} - {grade?.student.lastName}
        </span>
        <span className="grades">{grade?.student.department}</span>
        <span className="grades">{grade?.studentClasses}</span>
        <span className="grades">{grade?.grade}</span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 10px;

  .grades-head {
    margin-right: 90px;
    font-size: 18px;
    font-weight: 600;
  }

  .grades {
    margin-right: 60px;
  }
`;
export default DisplayGrades;
