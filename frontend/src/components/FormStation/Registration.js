import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Validate from "./Validate";

const Rgistration = () => {
  let history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [user, setUser] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState(""); // used for provience/state or territory.
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // This state is for handling error input submission
  const [wrongSubmission, setWrongSubmission] = useState(null);

  const handleRegistrationInfo = (e) => {
    e.preventDefault();

    const validationStatus = Validate({
      firstName,
      lastName,
      gender,
      email,
      address,
      user,
      birthday,
      phoneNumber,
      city,
      location,
      country,
      zip,
      password,
      passwordConfirm,
    });

    if (validationStatus !== "good") {
      setWrongSubmission(validationStatus);
      return;
    } else {
      setWrongSubmission(null);
    }

    try {
      //CREATE PURCHASE
      fetch("/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          gender,
          email,
          address,
          user,
          birthday,
          phoneNumber,
          city,
          location,
          country,
          zip,
          password,
          passwordConfirm,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            history.push("/confirmation");
            window.location.reload();
          }
          if (data.status === 400) {
            console.log("ERROR:", data.error);
            setWrongSubmission(data.error);
          }
        });
    } catch (error) {
      console.error("ERROR:", error);
      setWrongSubmission("Sorry we are having server issues at the moment");
    }
  };

  return (
    <>
      <Wrapper>
        <Form onSubmit={handleRegistrationInfo}>
          <Section>
            <Subtitle>Register Information</Subtitle>

            <SideBySide>
              <Input
                type="text"
                name="firstname"
                placeholder="Enter your Firstname"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <Input
                type="text"
                name="lastname"
                placeholder="Enter your Lastname"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </SideBySide>

            <SideBySide>
              <select
                className="select-role"
                name="role"
                id="role"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <option value="">Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </SideBySide>

            <SideBySide>
              <Input
                type="address"
                name="address"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </SideBySide>

            <SideBySide>
              <select
                className="select-role"
                name="role"
                id="role"
                onChange={(e) => {
                  setUser(e.target.value);
                }}
              >
                <option value="">Choose a role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </SideBySide>

            <SideBySide>
              <Input
                type="date"
                id="DOB"
                name="DOB"
                placeholder="Date of Birth"
                onChange={(e) => {
                  setBirthday(e.target.value);
                }}
              />
            </SideBySide>

            <SideBySide>
              <Input
                required
                type="text"
                name="phone"
                placeholder="+1 (450) 555-5555"
                value={phoneNumber}
                maxLength="17"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
            </SideBySide>

            <SideBySide>
              <Input
                type="text"
                name="city"
                placeholder="Enter your City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Input
                type="text"
                name="province"
                placeholder="Enter your province"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
            </SideBySide>
            <SideBySide>
              <Input
                type="text"
                name="country"
                placeholder="Enter your Country"
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              />
              <Input
                required
                type="text"
                name="zip code"
                placeholder="Enter your Zip/Postal code"
                maxLength="7"
                onChange={(e) => {
                  setZip(e.target.value);
                }}
              />
            </SideBySide>
          </Section>

          <Section>
            <Subtitle>SignUp Information</Subtitle>
            <SideBySide>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </SideBySide>

            <SideBySide>
              <Input
                type="password"
                name="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Input
                type="password"
                name="password2"
                placeholder="Confirm your Password"
                value={passwordConfirm}
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                }}
              />
            </SideBySide>
          </Section>
          <Button type="submit">Sign up</Button>

          {wrongSubmission && (
            <WrongRequest>
              <div>{wrongSubmission}</div>
            </WrongRequest>
          )}

          <SpanStyled className="register-form">
            Back to Signin page?
            <Link to="/signin" style={{ textDecoration: "none" }}>
              here
            </Link>
          </SpanStyled>
        </Form>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-size: cover;
  background-position: center;
  height: 110vh;
  background-repeat: no-repeat;
  background-attachment: fixed;

  .select-role {
    flex: 1;
    width: 100%;
    height: 42px;
    letter-spacing: 1px;
    background-color: transparent;
    border: 1px solid rgba(0, 0, 0, 0.25);
    padding: 0 16px;
    margin-right: 8px;
    color: #808080;
  }
`;

const SideBySide = styled.div`
  display: flex;
  margin-bottom: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
    margin-bottom: 0;
  }
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Subtitle = styled.div`
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 10px;
  color: #86bc42;
  font-family: "Teko", sans-serif;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #86bc42;
  width: 300px;
  height: 40px;
  margin-top: 10px;
  margin-bottom: 20px;
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
  margin-top: 350px;

  .login-span {
    color: #86bc42;
    margin-bottom: 30px;
  }
`;

const Input = styled.input`
  flex: 1;
  width: 100%;
  height: 42px;
  letter-spacing: 1px;
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.25);
  padding: 0 16px;
  margin-right: 8px;

  &:last-child {
    margin-right: 15;
  }

  @media (max-width: 600px) {
    flex: auto;
    width: 100%;
    margin-right: 0;
    margin-bottom: 8px;
  }
`;

const WrongRequest = styled.div`
  color: red;
  text-align: center;
  margin: 15px 0 15px 0;
  font-family: "Teko", sans-serif;
  font-weight: 500;
`;

export default Rgistration;
