import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import { FaGraduationCap } from "react-icons/fa";

const Header = () => {
  return (
    <>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Logo>
            {/* <FaGraduationCap /> */}
            schoolPORTAL
          </Logo>
        </Link>

        <SigninStyle>
          <Link
            to="/SignIn"
            style={{ textDecoration: "none", color: "#fff", margin: "20px" }}
          >
            <span>Sign In</span>
          </Link>
          <Button>SignOut</Button>
        </SigninStyle>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #86bc42;
  height: 60px;
  background-attachment: fixed;

  @media (max-width: 600px) {
    padding: 16px;
  }
`;

const Logo = styled.h1`
  color: #fff;
  margin-left: 45px;
  font-size: 35px;
  text-decoration: none;
`;

const SigninStyle = styled.span`
  color: #fff;
  margin-right: 45px;
  padding: 5px;
  font-size: 20px;
`;

const Button = styled.button`
  background-color: #86bc42;
  color: #fff;
  border-radius: 8px;
  border: 1px solid #fff;
  padding: 10px 20px;
  margin-right: 10px;
  font-size: 16px;

  &:hover {
    cursor: pointer;
  }
`;

export default Header;
