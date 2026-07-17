"use strict";

const { clerkMiddleware, requireAuth, getAuth, clerkClient } = require("@clerk/express");

const isClerkConfigured = () => {
  const secretKey = process.env.CLERK_SECRET_KEY;
  const publishableKey = process.env.CLERK_PUBLISHABLE_KEY;

  return (
    secretKey &&
    publishableKey &&
    !secretKey.includes("REPLACE_WITH") &&
    !publishableKey.includes("REPLACE_WITH")
  );
};

const noopMiddleware = (_req, _res, next) => next();

const clerkMiddlewareOrNoop = () =>
  isClerkConfigured() ? clerkMiddleware() : noopMiddleware;

const requireAuthOrUnavailable = () => {
  if (!isClerkConfigured()) {
    return (_req, res) =>
      res.status(503).json({
        status: 503,
        error:
          "Clerk is not configured on the server. Add CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY to backend/.env.",
      });
  }

  return requireAuth();
};

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
  if (!isClerkConfigured()) {
    return res.status(503).json({
      status: 503,
      error:
        "Clerk is not configured on the server. Add CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY to backend/.env.",
    });
  }

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
  if (!isClerkConfigured()) {
    return res.status(503).json({
      status: 503,
      error:
        "Clerk is not configured on the server. Add CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY to backend/.env.",
    });
  }

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
  isClerkConfigured,
  clerkMiddlewareOrNoop,
  requireAuthOrUnavailable,
  getAuth,
  getAuthenticatedEmail,
  requireAuthenticatedEmail,
  requireMatchingEmailParam,
};
