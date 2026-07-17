import React from "react";

const ClerkSetup = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 20px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        background: "#f7f7f7",
      }}
    >
      <div
        style={{
          maxWidth: "640px",
          background: "#fff",
          borderRadius: "12px",
          padding: "32px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
        }}
      >
        <h1 style={{ margin: "0 0 12px", color: "#333" }}>Clerk setup required</h1>
        <p style={{ margin: "0 0 16px", color: "#555", lineHeight: 1.6 }}>
          The app is using a placeholder Clerk key. Add your real API keys, then
          restart the frontend server.
        </p>
        <ol style={{ color: "#444", lineHeight: 1.7, paddingLeft: "20px" }}>
          <li>
            Open{" "}
            <a
              href="https://dashboard.clerk.com/last-active?path=api-keys"
              target="_blank"
              rel="noreferrer"
            >
              Clerk API Keys
            </a>
          </li>
          <li>Copy your Publishable key and Secret key</li>
          <li>
            Update <code>frontend/.env</code> with{" "}
            <code>REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_...</code>
          </li>
          <li>
            Update <code>backend/.env</code> with:
            <ul>
              <li>
                <code>CLERK_SECRET_KEY=sk_test_...</code>
              </li>
              <li>
                <code>CLERK_PUBLISHABLE_KEY=pk_test_...</code>
              </li>
            </ul>
          </li>
          <li>Restart both backend and frontend</li>
        </ol>
      </div>
    </div>
  );
};

export const isClerkKeyConfigured = (key) =>
  Boolean(
    key &&
      !key.includes("REPLACE_WITH") &&
      /^pk_(test|live)_/.test(key)
  );

export default ClerkSetup;
