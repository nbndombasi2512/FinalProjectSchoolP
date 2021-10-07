import React from "react";
import { Switch, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Profile from "./components/profileStation/Profile";
import SignIn from "./components/FormStation/SignIn";
import Registration from "./components/FormStation/Registration";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <>
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

          <Route exact path="/registration">
            <Registration />
          </Route>

          {/* Wrapper for the profile component only */}
          <Wrapper>
            <Sidebar />
            <Switch>
              <Route exact path="/profile">
                <Profile />
              </Route>
            </Switch>
          </Wrapper>
        </Switch>
      </Main>
      <Footer />
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const Main = styled.main`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;
export default App;
