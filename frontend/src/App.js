import React from "react";
import { Switch, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Profile from "./components/profileStation/Profile";
import SignIn from "./components/FormStation/SignIn";
import SignUp from "./components/FormStation/SignUp";
import Registration from "./components/FormStation/Registration";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

const PageWithSidebar = ({ children }) => (
  <PageLayout>
    <Sidebar />
    <PageContent>{children}</PageContent>
  </PageLayout>
);

const App = () => {
  return (
    <AppShell>
      <GlobalStyles />
      <Header />
      <Main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/sign-up">
            <SignUp />
          </Route>
          <ProtectedRoute exact path="/registration">
            <Registration />
          </ProtectedRoute>
          <ProtectedRoute path="/profile">
            <PageWithSidebar>
              <Profile />
            </PageWithSidebar>
          </ProtectedRoute>
        </Switch>
      </Main>
      <Footer />
    </AppShell>
  );
};

const AppShell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const PageLayout = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
`;

const PageContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const Main = styled.main`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;
export default App;
