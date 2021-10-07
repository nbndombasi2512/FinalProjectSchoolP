const Validate = ({
  firstName,
  lastName,
  gender,
  email,
  address,
  user,
  studentStaff,
  phoneNumber,
  courses,
  city,
  location,
  country,
  zip,
  password,
}) => {
  let validationStatus = "good";
  if (firstName.length < 2) {
    validationStatus = "First name requires a minimum of 2 or more letters";
  }

  if (lastName.length < 2) {
    validationStatus = "Last name requires a minimum of 2 or more letters";
  }

  if (gender === "") {
    validationStatus = "Please Select gender ";
  }

  if (studentStaff === "") {
    validationStatus = "Please Select year ";
  }

  if (user === "") {
    validationStatus = "Please Select user ";
  }
  // address requires min. length of 2.
  if (address.length < 2) {
    validationStatus = "Please enter a valid address";
  }
  if (city.length < 1) {
    validationStatus = "Please enter a city";
  }
  // State/Province/Territory must be selected. (not "" )
  if (!location) {
    validationStatus = "Please enter a province";
  }
  // Country must be selected. (not "" )
  if (!country) {
    validationStatus = "Please enter Canada";
  }
  // Zip must be less then 10 characters.
  if (zip.length > 10) {
    validationStatus = "Zip code must be less then 10 characters";
  }

  // INPUTS FOR CONTACT INFORMATION
  // Phone number must be less then 18 characters.
  if (phoneNumber.length > 10) {
    validationStatus = "Invalid phone number";
  }
  // Email must include an "@" and a ".".
  if (!email) {
    validationStatus = "Please enter your email";
  }

  if (!email.includes("@") || !email.includes(".")) {
    validationStatus = 'Email must include an "@" and a "."';
  }

  if (!password) {
    validationStatus = "Password is required";
  } else if (password.length < 6) {
    validationStatus = "Password needs to be 6 characters or more";
  }

  return validationStatus;
};

export default Validate;
