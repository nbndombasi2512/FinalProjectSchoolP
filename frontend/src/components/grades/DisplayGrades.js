import React from "react";

const DisplayGrades = ({ grade }) => {
  return (
    <div>
      {/* <span>{studentGrade?.studentId}</span> */}
      <span>
        {grade?.student.firstName} - {grade?.student.lastName}
      </span>
      <span>{grade?.student.department}</span>
      <span>{grade?.studentClasses}</span>
      <span>{grade?.grade}</span>
    </div>
  );
};

export default DisplayGrades;
