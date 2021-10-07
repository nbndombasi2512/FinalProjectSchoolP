import React, { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router";

export const SchoolContext = createContext(null);

export const SchoolContextProvider = ({ children }) => {
  const [faculties, setFaculties] = useState();
  const [email, setEmail] = useState(null);
  const [signedInUser, setSignedInUser] = useState({});
  const history = useHistory();

  const userSignedInAction = (email) => {
    setEmail(email);
    localStorage.setItem("data", JSON.stringify({ email }));
  };

  const userSignedOutAction = () => {
    setEmail(null);
    localStorage.clear();
    history.push("/signin");
  };

  useEffect(() => {
    fetch("/api/faculty").then((Response) =>
      Response.json().then((data) => {
        setFaculties(data.data);
      })
    );
  }, []);

  return (
    <SchoolContext.Provider
      value={{
        faculties,
        email,
        signedInUser,
        setSignedInUser,
        userSignedInAction,
        userSignedOutAction,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};
