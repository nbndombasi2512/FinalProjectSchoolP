"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const {
  addRegistration,
  getAllFaculties,
  handleLogin,
  getAllRegisteredStudent,
  getStudentByEmail,
  addGrade,
  getAllStudentGrade,
  getGradeByClasse,
} = require("./HandlerFolder/Handlers");

const PORT = 8000;

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  .post("/api/registration", addRegistration)
  .get("/api/registration", getAllRegisteredStudent)
  .get("/api/registration/:email", getStudentByEmail)
  .post("/api/grade", addGrade)
  .get("/api/grade", getGradeByClasse)
  .get("/api/teacher/grade/:id", getAllStudentGrade)

  .get("/api/faculty", getAllFaculties)
  .post("/api/signin", handleLogin)

  // handle 404s
  .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
