const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const itemsArray = require("./data/faculty.json");
// const companiesArray = require("./data/companies.json");

const batchImport = async () => {
  try {
    // create new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();

    // connect to the database
    const db = client.db("SchoolPortal");

    // create the items collection
    // await db.collection("faculty").insertMany(itemsArray);
    // console.log("connected!");
    // await db.collection("registrations").deleteMany();
    // console.log("connected!");
    // create the companies collection
    // await db.collection("companies").insertMany(companiesArray);

    client.close();
  } catch (err) {
    console.log("batch import error", err);
  }
};

batchImport();
