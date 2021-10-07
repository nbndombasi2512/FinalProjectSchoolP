import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { SchoolContext } from "../SchoolContext";
import SigninValidation from "./SigninValidation";

const SignIn = () => {
  const { setSignedInUser, userSignedInAction } = useContext(SchoolContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // This state is for handling error input submission
  const [wrongSubmission, setWrongSubmission] = useState(null);

  const handleSubmitButton = (e) => {
    e.preventDefault();

    const validationStatus = SigninValidation({
      email,
      password,
    });

    // console.log("validation status :", validationStatus);
    if (validationStatus !== "good") {
      setWrongSubmission(validationStatus);
      return;
    } else {
      setWrongSubmission(null);
    }

    // Simple POST request with a JSON using fetch
    fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          userSignedInAction(data.data.email);
          setSignedInUser(data.data);
          history.push("/profile");
        } else {
          setWrongSubmission("Password or ur email doesn't match");
        }
      });
  };
  return (
    <div>
      <Wrapper>
        <Form onSubmit={handleSubmitButton}>
          <h2 className="login-span" to={"/profile"}>
            Signin
          </h2>
          <Input
            type="email"
            placeholder="Your Email "
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Your Password "
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Submit</Button>

          {wrongSubmission && (
            <WrongRequest>
              <div>{wrongSubmission}</div>
            </WrongRequest>
          )}

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
  height: 70vh;
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
  margin-bottom: 60px;
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
  height: 50px;
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

const WrongRequest = styled.div`
  color: red;
  text-align: center;
  margin: 15px 0 15px 0;
  font-family: "Teko", sans-serif;
  font-weight: 500;
`;

export default SignIn;
