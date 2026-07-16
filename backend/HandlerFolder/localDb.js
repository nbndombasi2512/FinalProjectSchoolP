"use strict";

const fs = require("fs");
const path = require("path");

const registrationsPath = path.join(__dirname, "../data/registrations.json");
const gradesPath = path.join(__dirname, "../data/grades.json");

const readJsonFile = (filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]");
      return [];
    }
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.log(error.stack);
    return [];
  }
};

const writeJsonFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const readRegistrations = () => readJsonFile(registrationsPath);

const writeRegistrations = (registrations) => {
  writeJsonFile(registrationsPath, registrations);
};

const addRegistrationLocal = (registration) => {
  const registrations = readRegistrations();
  const exists = registrations.find((entry) => entry.email === registration.email);

  if (exists) {
    return { error: "Email already registered" };
  }

  registrations.push(registration);
  writeRegistrations(registrations);
  return { insertedId: registration._id };
};

const findRegistrationLocal = (query) => {
  const registrations = readRegistrations();
  return registrations.find((entry) =>
    Object.entries(query).every(([key, value]) => entry[key] === value)
  );
};

const findRegistrationsLocal = (query) => {
  const registrations = readRegistrations();
  return registrations.filter((entry) =>
    Object.entries(query).every(([key, value]) => entry[key] === value)
  );
};

const readGrades = () => readJsonFile(gradesPath);

const writeGrades = (grades) => {
  writeJsonFile(gradesPath, grades);
};

const addGradeLocal = (gradeEntry) => {
  const grades = readGrades();
  const student = findRegistrationLocal({ _id: gradeEntry.studentId });

  grades.push({ ...gradeEntry, student: student || null });
  writeGrades(grades);
  return { insertedId: grades.length };
};

const findGradesLocal = (query) => {
  const grades = readGrades();
  return grades.filter((entry) =>
    Object.entries(query).every(([key, value]) => entry[key] === value)
  );
};

module.exports = {
  addRegistrationLocal,
  findRegistrationLocal,
  findRegistrationsLocal,
  addGradeLocal,
  findGradesLocal,
  readGrades,
  readRegistrations,
};
