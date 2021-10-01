import React, { createContext, useState, useEffect } from "react";

export const SchoolContext = createContext(null);

export const SchoolContextProvider = ({ children }) => {
  const [faculties, setFaculties] = useState();

  useEffect(() => {
    fetch("/api/faculty").then((Response) =>
      Response.json().then((data) => {
        setFaculties(data.data);
        console.log("Checking point: ", data);
      })
    );
  }, []);

  return (
    <SchoolContext.Provider
      value={{
        faculties,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};
