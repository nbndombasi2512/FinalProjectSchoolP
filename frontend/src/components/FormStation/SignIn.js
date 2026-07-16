import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <Wrapper>
      <FormCard>
        <SignIn
          routing="path"
          path="/signin"
          signUpUrl="/sign-up"
          afterSignInUrl="/profile"
        />
        <SpanStyled>
          Don't have an account yet?{" "}
          <Link to="/sign-up">Register here</Link>
        </SpanStyled>
      </FormCard>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 60px 20px 80px;
`;

const FormCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  max-width: 420px;
`;

const SpanStyled = styled.p`
  margin: 0;
  text-align: center;
  color: #888;
  font-size: 14px;

  a {
    color: #86bc42;
    text-decoration: none;
    font-weight: 600;
  }
`;

export default SignInPage;
