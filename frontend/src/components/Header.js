import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { SchoolContext } from "./SchoolContext";

const Header = () => {
  const { email, userSignedOutAction } = useContext(SchoolContext);

  return (
    <Wrapper>
      <LogoLink to="/">
        <Logo>schoolPORTAL</Logo>
      </LogoLink>

      <NavActions>
        {email ? (
          <UserActions>
            <UserEmail title={email}>{email}</UserEmail>
            <SignOutButton type="button" onClick={userSignedOutAction}>
              Sign out
            </SignOutButton>
          </UserActions>
        ) : (
          <SignInLink to="/signin">Sign in</SignInLink>
        )}
      </NavActions>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #86bc42;
  height: 60px;
  padding: 0 32px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  @media (max-width: 600px) {
    padding: 0 16px;
  }
`;

const LogoLink = styled(Link)`
  text-decoration: none;
`;

const Logo = styled.h1`
  margin: 0;
  color: #fff;
  font-family: "Teko", sans-serif;
  font-size: 32px;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UserEmail = styled.span`
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 600px) {
    max-width: 120px;
    font-size: 13px;
  }
`;

const SignOutButton = styled.button`
  background: transparent;
  color: #fff;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.9);
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const SignInLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  padding: 8px 18px;
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

export default Header;
