"use strict";

const morgan = require("morgan");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const handleLogin = async (req, res) => {
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("SchoolPortal");

    await db.collection("registrations").findOne(req.body, (err, result) => {
      console.log(req.body);
      result
        ? res.status(200).json({ status: 200, data: result })
        : res
            .status(404)
            .json({ status: 404, data: "Email or password no valid" });
    });
  } catch (error) {
    console.log(error.stack);
  }
};

const getHandleLogin = async (req, res) => {
  try {
    const { _id } = req.params;
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("SchoolPortal");
    db.collection("registrations").findOne({ _id }, (err, result) => {
      result
        ? res.status(200).json({ status: 200, _id, data: result })
        : res.status(404).json({ status: 404, _id, data: "Not Found" });
      client.close();
    });
  } catch (error) {
    console.log(error.stack);
  }
};

const getAllRegisteredStudent = async (req, res) => {
  try {
    const { user } = req.query;

    console.log("student: ", user);
    // create new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();
    // connect to the database
    const db = client.db("SchoolPortal");
    // create the items collection
    const result = await db
      .collection("registrations")
      .find({ user })
      .toArray();

    if (result) {
      return res.status(200).json({ status: 200, data: result });
    } else {
      return res.status(404).json({ status: 404, data: error });
    }
  } catch (error) {
    console.log(error.stack);
  }
};

const getStudentByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    // create new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();
    // connect to the database
    const db = client.db("SchoolPortal");
    // create the items collection
    const result = await db.collection("registrations").findOne({ email });
    // console.log("connected!", result);

    if (result) {
      return res.status(200).json({ status: 200, data: result });
    } else {
      return res.status(404).json({ status: 404, data: error });
    }
  } catch (error) {
    console.log(error.stack);
  }
};

const getAllStudentGrade = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.query;
    let result;
    // create new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();
    // connect to the database
    const db = client.db("SchoolPortal");
    // create the items collection
    if (user === "teacher") {
      result = await db.collection("grades").find({ teacherId: id }).toArray();
    } else {
      result = await db.collection("grades").find({ studentId: id }).toArray();
    }

    if (result) {
      return res.status(200).json({ status: 200, data: result });
    } else {
      return res.status(404).json({ status: 404, data: error });
    }
  } catch (error) {
    console.log(error.stack);
  }
};

// POST user validation - login
const addRegistration = async (req, res) => {
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("SchoolPortal");

    const result = await db.collection("registrations").insertOne(req.body);

    // On success, send
    res.status(200).json({ status: 200, data: result });
  } catch (error) {
    console.log(error.stack);
    res.status(404).json({ status: 404, data: req.body });
  }
};

// POST user validation - login
const addGrade = async (req, res) => {
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("SchoolPortal");
    const { studentId } = req.body;

    const student = await db
      .collection("registrations")
      .findOne({ _id: studentId });

    const result = await db
      .collection("grades")
      .insertOne({ ...req.body, student });

    // On success, send
    res.status(200).json({ status: 200, data: result });
  } catch (error) {
    console.log(error.stack);
    res.status(404).json({ status: 404, data: req.body });
  }
};

const addImageForTeachers = async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "dev_setups",
    });
    console.log(uploadResponse);
    res.json({ msg: "yaya" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
};

const getAllFaculties = async (req, res) => {
  try {
    // create new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();
    // connect to the database
    const db = client.db("SchoolPortal");
    // create the items collection
    const result = await db.collection("faculty").find().toArray();
    // console.log("connected!", result);

    if (result.length > 0) {
      return res.status(200).json({ status: 200, data: result });
    } else {
      return res.status(404).json({ status: 404, data: error });
    }
  } catch (error) {
    console.log(error.stack);
  }
};

const getGradeByClasse = async (req, res) => {
  try {
    // create new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();
    // connect to the database
    const db = client.db("SchoolPortal");
    // create the items collection
    const result = await db.collection("grades").find().toArray();
    // console.log("connected!", result);

    if (result.length > 0) {
      return res.status(200).json({ status: 200, data: result });
    } else {
      return res.status(404).json({ status: 404, data: error });
    }
  } catch (error) {
    console.log(error.stack);
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
};
