"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const {
  addRegistration,
  getAllFaculties,
  handleLogin,
} = require("./HandlerFolder/Handlers");

const PORT = 8000;

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  .post("/api/registration", addRegistration)
  .get("/api/faculty", getAllFaculties)
  .get("/api/signin", handleLogin)

  // handle 404s
  .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
