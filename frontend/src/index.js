import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { SchoolContextProvider } from "./components/SchoolContext";

ReactDOM.render(
  <BrowserRouter>
    <SchoolContextProvider>
      <App />
    </SchoolContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
