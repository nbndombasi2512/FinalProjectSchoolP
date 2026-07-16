"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();
const {
  addRegistration,
  getAllFaculties,
  getAllRegisteredStudent,
  getStudentByEmail,
  addGrade,
  getAllStudentGrade,
  getGradeByClasse,
  ensureOwnRegistrationId,
} = require("./HandlerFolder/Handlers");
const {
  clerkMiddleware,
  requireAuth,
  requireAuthenticatedEmail,
  requireMatchingEmailParam,
} = require("./middleware/auth");

const PORT = 8000;
const { connectDb } = require("./db");

if (!process.env.CLERK_SECRET_KEY) {
  console.warn(
    "Warning: CLERK_SECRET_KEY is missing from backend/.env. Protected API routes will fail."
  );
}

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  .use(clerkMiddleware())

  .get("/api/faculty", getAllFaculties)

  .post("/api/registration", requireAuth(), requireAuthenticatedEmail, addRegistration)
  .get(
    "/api/registration/:email",
    requireAuth(),
    requireMatchingEmailParam,
    getStudentByEmail
  )
  .get(
    "/api/registration",
    requireAuth(),
    requireAuthenticatedEmail,
    getAllRegisteredStudent
  )

  .post("/api/grade", requireAuth(), requireAuthenticatedEmail, addGrade)
  .get("/api/grade", requireAuth(), requireAuthenticatedEmail, getGradeByClasse)
  .get(
    "/api/teacher/grade/:id",
    requireAuth(),
    requireAuthenticatedEmail,
    ensureOwnRegistrationId,
    getAllStudentGrade
  )

  // handle 404s
  .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))

  .listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`);
    try {
      await connectDb();
    } catch (error) {
      console.log("MongoDB unavailable, using local JSON fallback:", error.message);
    }
  });
