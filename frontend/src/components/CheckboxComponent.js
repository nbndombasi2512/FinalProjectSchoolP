import React, { useState } from "react";

//course, handleChange, selectedClasses
const CheckboxComponent = ({ checked, handleOnChange, name }) => {
  return (
    <div key={name}>
      <input
        type="checkbox"
        name="geology 101"
        value={name}
        id={name}
        onChange={handleOnChange}
        checked={checked}
      />

      <label hmtlfor={name}>{name} </label>
    </div>
  );
};

export default CheckboxComponent;
