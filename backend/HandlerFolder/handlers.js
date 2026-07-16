"use strict";

const { connectDb } = require("../db");
const {
  addRegistrationLocal,
  findRegistrationLocal,
  findRegistrationsLocal,
  addGradeLocal,
  findGradesLocal,
} = require("./localDb");

const handleLogin = async (_req, res) => {
  return res.status(410).json({
    status: 410,
    error: "Password sign-in is disabled. Please use Clerk authentication.",
  });
};

const getRegistrationForEmail = async (email) => {
  try {
    const db = await connectDb();
    return db.collection("registrations").findOne({ email });
  } catch (error) {
    console.log(error.message);
    return findRegistrationLocal({ email });
  }
};

const ensureOwnRegistrationId = async (req, res, next) => {
  try {
    const registration = await getRegistrationForEmail(req.authEmail);

    if (!registration) {
      return res.status(404).json({ status: 404, error: "Registration not found" });
    }

    if (registration._id !== req.params.id) {
      return res.status(403).json({ status: 403, error: "Forbidden" });
    }

    req.registration = registration;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({ status: 403, error: "Forbidden" });
  }
};

const getHandleLogin = async (req, res) => {
  try {
    const { _id } = req.params;
    const db = await connectDb();
    const result = await db.collection("registrations").findOne({ _id });

    return result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(404).json({ status: 404, _id, data: "Not Found" });
  } catch (error) {
    console.log(error.message);
    const result = findRegistrationLocal({ _id: req.params._id });

    return result
      ? res.status(200).json({ status: 200, _id: req.params._id, data: result })
      : res.status(404).json({ status: 404, _id: req.params._id, data: "Not Found" });
  }
};

const getAllRegisteredStudent = async (req, res) => {
  const { user } = req.query;

  try {
    const db = await connectDb();
    const result = await db.collection("registrations").find({ user }).toArray();
    return res.status(200).json({ status: 200, data: result });
  } catch (error) {
    console.log(error.message);
    const result = findRegistrationsLocal({ user });
    return res.status(200).json({ status: 200, data: result });
  }
};

const getStudentByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const db = await connectDb();
    const result = await db.collection("registrations").findOne({ email });

    return result
      ? res.status(200).json({ status: 200, data: result })
      : res.status(404).json({ status: 404, data: "Not Found" });
  } catch (error) {
    console.log(error.message);
    const result = findRegistrationLocal({ email });

    return result
      ? res.status(200).json({ status: 200, data: result })
      : res.status(404).json({ status: 404, data: "Not Found" });
  }
};

const getAllStudentGrade = async (req, res) => {
  const { id } = req.params;
  const { user } = req.query;

  try {
    const db = await connectDb();
    const query =
      user === "teacher" ? { teacherId: id } : { studentId: id };
    const result = await db.collection("grades").find(query).toArray();
    return res.status(200).json({ status: 200, data: result });
  } catch (error) {
    console.log(error.message);
    const query =
      user === "teacher" ? { teacherId: id } : { studentId: id };
    const result = findGradesLocal(query);
    return res.status(200).json({ status: 200, data: result });
  }
};

const addRegistration = async (req, res) => {
  const email = req.authEmail;
  const registrationPayload = {
    ...req.body,
    email,
  };

  delete registrationPayload.password;

  try {
    const db = await connectDb();
    const existing = await db
      .collection("registrations")
      .findOne({ email });

    if (existing) {
      return res.status(400).json({ status: 400, error: "Email already registered" });
    }

    const result = await db.collection("registrations").insertOne(registrationPayload);
    return res.status(200).json({ status: 200, data: result });
  } catch (error) {
    console.log(error.message);
    const result = addRegistrationLocal(registrationPayload);

    if (result.error) {
      return res.status(400).json({ status: 400, error: result.error });
    }

    return res.status(200).json({ status: 200, data: result });
  }
};

const addGrade = async (req, res) => {
  try {
    const db = await connectDb();
    const { studentId } = req.body;
    const student = await db
      .collection("registrations")
      .findOne({ _id: studentId });

    const result = await db
      .collection("grades")
      .insertOne({ ...req.body, student });

    return res.status(200).json({ status: 200, data: result });
  } catch (error) {
    console.log(error.message);
    const result = addGradeLocal(req.body);
    return res.status(200).json({ status: 200, data: result });
  }
};

const getAllFaculties = async (req, res) => {
  try {
    const db = await connectDb();
    const result = await db.collection("faculty").find().toArray();

    if (result.length > 0) {
      return res.status(200).json({ status: 200, data: result });
    }
  } catch (error) {
    console.log(error.message);
  }

  const facultyData = require("../data/faculty.json");
  return res.status(200).json({ status: 200, data: facultyData });
};

const getGradeByClasse = async (req, res) => {
  try {
    const db = await connectDb();
    const result = await db.collection("grades").find().toArray();
    return res.status(200).json({ status: 200, data: result });
  } catch (error) {
    console.log(error.message);
    const result = findGradesLocal({});
    return res.status(200).json({ status: 200, data: result });
  }
};

module.exports = {
  addRegistration,
  getAllFaculties,
  handleLogin,
  getHandleLogin,
  getAllRegisteredStudent,
  getStudentByEmail,
  addGrade,
  getAllStudentGrade,
  getGradeByClasse,
  ensureOwnRegistrationId,
  getRegistrationForEmail,
};
