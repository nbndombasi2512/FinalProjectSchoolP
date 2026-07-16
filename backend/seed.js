"use strict";

const { connectDb, closeDb } = require("./db");
const facultyData = require("./data/faculty.json");
const {
  readRegistrations,
  readGrades,
} = require("./HandlerFolder/localDb");

const seedDatabase = async () => {
  try {
    const db = await connectDb();

    const facultyCount = await db.collection("faculty").countDocuments();
    if (facultyCount === 0) {
      await db.collection("faculty").insertMany(facultyData);
      console.log(`Seeded ${facultyData.length} faculty records.`);
    } else {
      console.log(`Faculty collection already has ${facultyCount} records.`);
    }

    const localRegistrations = readRegistrations();
    if (localRegistrations.length > 0) {
      for (const registration of localRegistrations) {
        await db.collection("registrations").updateOne(
          { email: registration.email },
          { $set: registration },
          { upsert: true }
        );
      }
      console.log(`Synced ${localRegistrations.length} registrations.`);
    }

    const localGrades = readGrades();
    if (localGrades.length > 0) {
      for (const grade of localGrades) {
        await db.collection("grades").updateOne(
          {
            teacherId: grade.teacherId,
            studentId: grade.studentId,
            studentClasses: grade.studentClasses,
          },
          { $set: grade },
          { upsert: true }
        );
      }
      console.log(`Synced ${localGrades.length} grades.`);
    }

    console.log("Database seed completed successfully.");
  } catch (error) {
    console.error("Database seed failed:", error.message);
    console.error(
      "Update MONGO_URI in backend/.env with a valid MongoDB Atlas connection string."
    );
    process.exitCode = 1;
  } finally {
    await closeDb();
  }
};

seedDatabase();
