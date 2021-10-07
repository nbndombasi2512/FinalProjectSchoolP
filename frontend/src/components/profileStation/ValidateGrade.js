const ValidateGrade = ({ studentId, studentClasses, grade }) => {
  let validationStatus = "good";

  // Email must include an "@" and a ".".

  if (!studentId) {
    validationStatus = "Select student";
  }

  if (!studentClasses) {
    validationStatus = "Select student class / course";
  }

  if (!grade) {
    validationStatus = "Enter your grade";
  }

  return validationStatus;
};

export default ValidateGrade;
