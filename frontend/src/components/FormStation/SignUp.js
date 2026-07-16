import React from "react";
import styled from "styled-components";
import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <Wrapper>
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/signin"
        afterSignUpUrl="/registration"
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 60px 20px 80px;
`;

export default SignUpPage;
