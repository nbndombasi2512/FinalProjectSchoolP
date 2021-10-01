"use strict";

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

module.exports = {
  addRegistration,
  getAllFaculties,
  handleLogin,
};
