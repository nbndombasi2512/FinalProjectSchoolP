import React from "react";
import CourseImage from "./CourseImage";

//course, handleChange, selectedClasses
const CheckboxComponent = ({ checked, handleOnChange, name }) => {
  return (
    <div key={name} className="course-checkbox">
      <input
        type="checkbox"
        name="geology 101"
        value={name}
        id={name}
        onChange={handleOnChange}
        checked={checked}
      />

      <label htmlFor={name}>
        <CourseImage courseName={name} size="small" showName={true} />
      </label>
    </div>
  );
};

export default CheckboxComponent;
