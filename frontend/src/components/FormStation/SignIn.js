import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div>
      <Wrapper>
        <Form>
          <h2 className="login-span" to={"/profile"}>
            Signin
          </h2>
          <Input type="email" placeholder="Your Email " />
          <Input type="password" placeholder="Your Password " />
          <Button type="submit">Submit</Button>

          <SpanStyled className="register-form">
            Don't have an account yet?
            <Link to="/registration" style={{ textDecoration: "none" }}>
              Register here
            </Link>
          </SpanStyled>
        </Form>
      </Wrapper>
    </div>
  );
};

// All the styles of SignIn are handled here
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-size: cover;
  background-position: center;
  height: 100vh;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #86bc42;
  width: 300px;
  height: 40px;
  margin-top: 15px;
  margin-bottom: 120px;
  border-radius: 8px;
  border: transparent;
  font-size: 18px;
  padding: 15px;
  color: #fff;

  &:hover {
    cursor: pointer;
    background-color: #628a30;
    color: #fff;
    transition: transform 0.4s, opacity 0.5s ease-in-out;
  }
`;

const SpanStyled = styled.span`
  color: #bbb;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 170px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid transparent;
  margin-top: 300px;

  .login-span {
    color: #86bc42;
    margin-bottom: 30px;
  }
`;

const Input = styled.input`
  width: 280px;
  height: 30px;
  padding: 10px;
  border: 1px solid #4267b2;
  border-radius: 8px;
  font-size: 18px;
  margin: 5px;
`;

export default SignIn;
