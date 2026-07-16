import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import { SchoolContextProvider } from "./components/SchoolContext";

const clerkPublishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
  console.warn(
    "Missing REACT_APP_CLERK_PUBLISHABLE_KEY. Add it to frontend/.env"
  );
}

ReactDOM.render(
  <ClerkProvider publishableKey={clerkPublishableKey || ""}>
    <BrowserRouter>
      <SchoolContextProvider>
        <App />
      </SchoolContextProvider>
    </BrowserRouter>
  </ClerkProvider>,
  document.getElementById("root")
);
