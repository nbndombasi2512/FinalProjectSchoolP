const Validate = ({ email, password }) => {
  let validationStatus = "good";

  // Email must include an "@" and a ".".
  if (!email || email === "") {
    validationStatus = "Please enter your email";
  } else if (!email.includes("@") || !email.includes(".")) {
    validationStatus = 'Email must include an "@" and a "."';
  }

  // else {
  //   validationStatus = "Your password does not match";
  // }

  if (!password) {
    validationStatus = "Password is required";
  } else if (password.length < 6) {
    validationStatus = "Your account or password is incorrect!";
  }

  return validationStatus;
};

export default Validate;
