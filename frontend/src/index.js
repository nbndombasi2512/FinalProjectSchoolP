import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import { SchoolContextProvider } from "./components/SchoolContext";
import ClerkSetup, { isClerkKeyConfigured } from "./components/ClerkSetup";

const clerkPublishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

ReactDOM.render(
  isClerkKeyConfigured(clerkPublishableKey) ? (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <BrowserRouter>
        <SchoolContextProvider>
          <App />
        </SchoolContextProvider>
      </BrowserRouter>
    </ClerkProvider>
  ) : (
    <ClerkSetup />
  ),
  document.getElementById("root")
);
