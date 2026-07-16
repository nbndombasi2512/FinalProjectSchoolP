import React, { createContext, useState, useEffect, useMemo, useCallback } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { createAuthFetch } from "../utils/authFetch";

export const SchoolContext = createContext(null);

export const SchoolContextProvider = ({ children }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut, getToken } = useAuth();
  const [faculties, setFaculties] = useState();
  const [email, setEmail] = useState(null);
  const [signedInUser, setSignedInUser] = useState({});
  const [profileLoaded, setProfileLoaded] = useState(false);

  const authFetch = useMemo(() => createAuthFetch(getToken), [getToken]);

  const loadUserProfile = useCallback(
    async (userEmail) => {
      if (!userEmail) {
        setSignedInUser({});
        setProfileLoaded(true);
        return;
      }

      try {
        const response = await authFetch(
          `/api/registration/${encodeURIComponent(userEmail)}`
        );
        const data = await response.json();

        if (data.status === 200) {
          setSignedInUser(data.data);
        } else {
          setSignedInUser({});
        }
      } catch (error) {
        console.error("Failed to load user profile:", error);
        setSignedInUser({});
      } finally {
        setProfileLoaded(true);
      }
    },
    [authFetch]
  );

  useEffect(() => {
    fetch("/api/faculty")
      .then((response) => response.json())
      .then((data) => {
        setFaculties(data.data);
      })
      .catch((error) => {
        console.error("Failed to load faculties:", error);
      });
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn) {
      setEmail(null);
      setSignedInUser({});
      setProfileLoaded(true);
      return;
    }

    const userEmail =
      user?.primaryEmailAddress?.emailAddress ||
      user?.emailAddresses?.[0]?.emailAddress ||
      null;

    setEmail(userEmail);
    setProfileLoaded(false);
    loadUserProfile(userEmail);
  }, [isLoaded, isSignedIn, user, loadUserProfile]);

  const userSignedOutAction = () => {
    signOut();
  };

  const refreshUserProfile = () => {
    if (email) {
      setProfileLoaded(false);
      loadUserProfile(email);
    }
  };

  return (
    <SchoolContext.Provider
      value={{
        faculties,
        email,
        signedInUser,
        setSignedInUser,
        profileLoaded,
        authFetch,
        refreshUserProfile,
        userSignedOutAction,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};
