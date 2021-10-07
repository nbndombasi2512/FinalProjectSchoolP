import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Validate from "./Validate";
import { SchoolContext } from "../SchoolContext";
import CheckboxComponent from "../CheckboxComponent";

const Confirmation = ({ firstname, lastname, selectedClasses }) => (
  <div className="confirmation-style">
    {firstname} {lastname} your registration was successful
  </div>
);

const Rgistration = () => {
  const { faculties } = useContext(SchoolContext);
  const [selectedClasses, setSelectedClasses] = useState([]);

  const [image, setImage] = useState("");
  const [registered, setRegistered] = useState(false);

  const [courses, setCourses] = useState({});
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [user, setUser] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState(""); // used for provience/state or territory.
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (department && year) {
      const faculty = faculties?.filter((fact) => {
        return fact.faculty === department;
      });

      const courses = faculty[0].courses.filter(
        (course) => course.year === year
      );
      setCourses(courses[0]);
    }
  }, [department, year, faculties]);

  // This state is for handling error input submission
  const [wrongSubmission, setWrongSubmission] = useState(null);

  const idGenerateStudentStaff = (year, user) => {
    let val = Math.floor(1000 + Math.random() * 9000);
    if (user === "teacher") {
      return "2015" + val;
    }

    if (year === "firstYear") {
      return "2021" + val;
    } else if (year === "secondYear") {
      return "2020" + val;
    } else if (year === "thirdYear") {
      return "2019" + val;
    }
  };

  const handleRegistrationInfo = (e) => {
    e.preventDefault();

    const validationStatus = Validate({
      department,
      courses,
      year,
      firstName,
      lastName,
      gender,
      email,
      address,
      user,
      phoneNumber,
      city,
      location,
      country,
      zip,
      image,
      password,
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
          _id: idGenerateStudentStaff(year, user),
          department: department,
          // courses,
          year: year,
          firstName: firstName,
          lastName: lastName,
          selectedClasses: selectedClasses,
          gender: gender,
          email: email,
          address: address,
          user: user,
          phoneNumber: phoneNumber,
          city: city,
          location: location,
          country: country,
          zip: zip,
          image: image,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            setRegistered(!registered);
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
        {!registered ? (
          <Form onSubmit={handleRegistrationInfo}>
            <Section>
              <Subtitle>Register Information</Subtitle>

              <SideBySide>
                <select
                  className="select-role"
                  name="role"
                  id="role"
                  onChange={(e) => {
                    setDepartment(e.target.value);
                  }}
                >
                  <option value="" hidden>
                    department
                  </option>
                  <option value="Science">Science</option>
                  <option value="Administration">Administration</option>
                  <option value="Education">Education</option>
                </select>

                <select
                  className="select-role"
                  name="role"
                  id="role"
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                >
                  <option value="" hidden>
                    Select your year
                  </option>
                  <option value="firstYear">firstYear</option>
                  <option value="secondYear">secondYear</option>
                  <option value="thirdYear">thirdYear</option>
                </select>
              </SideBySide>

              <SideBySide style={{ flexDirection: "column" }}>
                {courses?.classes?.map((course) => {
                  return (
                    <EachDepartment>
                      <li className="single-year">
                        <CheckboxComponent
                          name={course}
                          checked={selectedClasses.some((e) => course === e)}
                          handleOnChange={(ev) => {
                            const selectedCourse = ev.target.value;

                            // NOTE: `!ev.target.checked` is the condition when the user clicked an unchecked checkbox
                            if (!ev.target.checked) {
                              setSelectedClasses((curr) =>
                                curr.filter((e) => e !== selectedCourse)
                              );
                              return;
                            }

                            if (selectedClasses.length >= 4) {
                              window.alert("Out of limit number classes");
                              return;
                            }

                            const newClasses = Array.from(
                              new Set([...selectedClasses, selectedCourse])
                            );

                            setSelectedClasses(newClasses);
                          }}
                        />
                      </li>
                    </EachDepartment>
                  );
                })}
              </SideBySide>

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
                <Input
                  type="text"
                  placeholder="+1 (514) 500-5000"
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
                  type="text"
                  name="zip code"
                  placeholder="Enter your Zip/Postal code"
                  maxLength="7"
                  onChange={(e) => {
                    setZip(e.target.value);
                  }}
                />
              </SideBySide>

              {/* <SideBySide>
                <div className="form-data">
                  <label for="image"> Upload image </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    value={image}
                    className="form-control-file"
                    onChange={(e) => {
                      setImage(e.target.value);
                    }}
                  />
                </div>
              </SideBySide> */}

              <Subtitle className="section-signup">SignUp Information</Subtitle>
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
        ) : (
          <Confirmation firstname={firstName} lastname={lastName} />
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-size: cover;
  background-position: center;
  height: 120vh;

  .confirmation-style {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
  }

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
  .section-signup {
    margin-top: 35px;
  }
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
  height: 350px;
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

const EachDepartment = styled.div`
  .single-year {
    padding: 5px;
    list-style: none;
  }
`;

export default Rgistration;
