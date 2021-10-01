import React from "react";

const Confirmation = ({ firstName, lastName }) => {
  return (
    <div>
      <p>Hello {`${firstName} ${lastName} welcome to schoolPortal`} </p>
      <span>Registration was successfully taken!</span>
    </div>
  );
};

export default Confirmation;
