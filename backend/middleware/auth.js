"use strict";

const { clerkMiddleware, requireAuth, getAuth, clerkClient } = require("@clerk/express");

const getAuthenticatedEmail = async (req) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return null;
  }

  const user = await clerkClient.users.getUser(userId);
  const primaryEmail = user.emailAddresses.find(
    (entry) => entry.id === user.primaryEmailAddressId
  );

  return primaryEmail?.emailAddress || null;
};

const requireAuthenticatedEmail = async (req, res, next) => {
  try {
    const email = await getAuthenticatedEmail(req);

    if (!email) {
      return res.status(401).json({ status: 401, error: "Unauthorized" });
    }

    req.authEmail = email;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ status: 401, error: "Unauthorized" });
  }
};

const requireMatchingEmailParam = async (req, res, next) => {
  try {
    const email = await getAuthenticatedEmail(req);
    const requestedEmail = decodeURIComponent(req.params.email || "");

    if (!email) {
      return res.status(401).json({ status: 401, error: "Unauthorized" });
    }

    if (email.toLowerCase() !== requestedEmail.toLowerCase()) {
      return res.status(403).json({ status: 403, error: "Forbidden" });
    }

    req.authEmail = email;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ status: 401, error: "Unauthorized" });
  }
};

module.exports = {
  clerkMiddleware,
  requireAuth,
  getAuth,
  getAuthenticatedEmail,
  requireAuthenticatedEmail,
  requireMatchingEmailParam,
};
