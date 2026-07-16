import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const ProtectedRoute = ({ children, ...rest }) => {
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <Route
      {...rest}
      render={() => {
        if (!isLoaded) {
          return null;
        }

        return isSignedIn ? children : <Redirect to="/signin" />;
      }}
    />
  );
};

export default ProtectedRoute;
