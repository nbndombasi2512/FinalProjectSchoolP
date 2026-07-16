"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
const DB_NAME = "SchoolPortal";

let client;
let db;

const connectDb = async () => {
  if (db) {
    return db;
  }

  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not set in backend/.env");
  }

  client = new MongoClient(MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  });

  await client.connect();
  db = client.db(DB_NAME);
  console.log("Connected to MongoDB:", DB_NAME);
  return db;
};

const closeDb = async () => {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
};

module.exports = { connectDb, closeDb, DB_NAME };
