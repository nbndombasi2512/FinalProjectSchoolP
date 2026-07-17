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
  clerkMiddlewareOrNoop,
  requireAuthOrUnavailable,
  requireAuthenticatedEmail,
  requireMatchingEmailParam,
  isClerkConfigured,
} = require("./middleware/auth");

const PORT = 8000;
const { connectDb } = require("./db");

if (!isClerkConfigured()) {
  console.warn(
    "Warning: Clerk keys are missing or still placeholders in backend/.env. Protected API routes will return 503 until both CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY are set."
  );
}

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  .use(clerkMiddlewareOrNoop())

  .get("/api/faculty", getAllFaculties)

  .post(
    "/api/registration",
    requireAuthOrUnavailable(),
    requireAuthenticatedEmail,
    addRegistration
  )
  .get(
    "/api/registration/:email",
    requireAuthOrUnavailable(),
    requireMatchingEmailParam,
    getStudentByEmail
  )
  .get(
    "/api/registration",
    requireAuthOrUnavailable(),
    requireAuthenticatedEmail,
    getAllRegisteredStudent
  )

  .post("/api/grade", requireAuthOrUnavailable(), requireAuthenticatedEmail, addGrade)
  .get("/api/grade", requireAuthOrUnavailable(), requireAuthenticatedEmail, getGradeByClasse)
  .get(
    "/api/teacher/grade/:id",
    requireAuthOrUnavailable(),
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
