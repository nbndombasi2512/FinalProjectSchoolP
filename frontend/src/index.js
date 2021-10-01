import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { SchoolContextProvider } from "./components/SchoolContext";

ReactDOM.render(
  <SchoolContextProvider>
    <App />
  </SchoolContextProvider>,
  document.getElementById("root")
);
