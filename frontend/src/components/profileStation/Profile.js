import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import ValidateGrade from "./ValidateGrade";
import { SchoolContext } from "../SchoolContext";
import DisplayGrades from "../grades/DisplayGrades";
import ProfileStudents from "./ProfileStudents";

const Profile = () => {
  const { signedInUser } = useContext(SchoolContext);
  // console.log(signedInUser, "signed in user");

  const [registration, setRegistration] = useState(null);

  const [getStudent, setGetStudent] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentClasses, setStudentClasses] = useState([]);
  const [getStudentGrade, setGetStudentGrade] = useState();
  // console.log("get student grade: ", getStudentGrade);

  const [grade, setGrade] = useState();

  const [wrongSubmission, setWrongSubmission] = useState();
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem("data")) || {};

    if (!email) {
      console.log("Email Missing");
      return;
    }
    fetch(`/api/registration/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setRegistration(data.data);
      });
  }, []);

  useEffect(() => {
    fetch("/api/registration?user=student")
      .then((res) => res.json())
      .then((data) => {
        setGetStudent(data.data);
      });
  }, []);

  useEffect(() => {
    if (signedInUser.user === "teacher") {
      fetchGrade();
    } else if (signedInUser.user === "student") {
      fetchGradeStudent();
    }
  }, []);

  const fetchGrade = () => {
    fetch(`/api/teacher/grade/${signedInUser._id}?user=teacher`)
      .then((res) => res.json())
      .then((data) => {
        setGetStudentGrade(data.data);
      });
  };

  const fetchGradeStudent = () => {
    fetch(`/api/teacher/grade/${signedInUser._id}?user=student`)
      .then((res) => res.json())
      .then((data) => {
        setGetStudentGrade(data.data);
      });
  };

  const handleRegisteredGrade = (e) => {
    e.preventDefault();

    const validationStatus = ValidateGrade({
      studentId,
      studentClasses,
      grade,
    });

    if (validationStatus !== "good") {
      setWrongSubmission(validationStatus);
      return;
    } else {
      setWrongSubmission(null);
    }

    try {
      //CREATE PURCHASE
      fetch("/api/grade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teacherId: signedInUser._id,
          studentId,
          studentClasses,
          grade,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            fetchGrade();
            console.log("grade has been posted successfully");
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

  const teacherStudents =
    getStudent &&
    getStudent?.filter((student) => {
      for (let i = 0; i < student.selectedClasses.length; i++) {
        if (signedInUser.selectedClasses.includes(student.selectedClasses[i])) {
          return true;
        }
        return false;
      }
    });

  return (
    <>
      <Wrapper className="row">
        <Grid>
          <StyledH1>LIST OF MY COURSES</StyledH1>
          <Depart style={{ marginLeft: "20px" }}>
            {registration &&
              registration.selectedClasses.map((classes) => {
                return (
                  <Department>
                    {classes}

                    <div className="classes-section">
                      {signedInUser.user === "teacher" && (
                        <>
                          <span className="full-name">
                            {registration.firstName} {registration.lastName}
                          </span>
                          <span className="full-name">
                            {registration.email}
                          </span>
                        </>
                      )}
                    </div>
                  </Department>
                );
              })}
          </Depart>
        </Grid>

        {signedInUser.user === "teacher" ? (
          <>
            <StyledH1>ASSIGNMENT MANAGER</StyledH1>
            <LiveSection>
              <Container>
                <BlocTabs>
                  <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(1)}
                  >
                    Grading
                  </button>
                  <button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(2)}
                  >
                    List of Students
                  </button>
                  <button
                    className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(3)}
                  >
                    Student Grade Transcript
                  </button>
                </BlocTabs>

                <ContentTabs>
                  <Form onSubmit={handleRegisteredGrade}>
                    <div
                      className={
                        toggleState === 1
                          ? "content  active-content"
                          : "content"
                      }
                    >
                      <H2>Student Grade Set</H2>

                      <SideBySide>
                        <select
                          className="select-role"
                          name="role"
                          id="role"
                          onChange={(e) => {
                            setStudentId(e.target.value);
                          }}
                        >
                          <option value="" hidden>
                            Student
                          </option>
                          {teacherStudents &&
                            teacherStudents.map((student) => {
                              // console.log("student : ", student);
                              return (
                                <option value={student._id}>
                                  {`${student.firstName} ${student.lastName}`}
                                </option>
                              );
                            })}
                        </select>

                        <select
                          className="select-role"
                          name="role"
                          id="role"
                          onChange={(e) => {
                            setStudentClasses(e.target.value);
                          }}
                        >
                          <option value="" hidden>
                            Courses
                          </option>
                          {signedInUser &&
                            signedInUser?.selectedClasses?.map((classes) => {
                              return <option value={classes}>{classes}</option>;
                            })}
                        </select>
                      </SideBySide>

                      <SideBySide>
                        <Input
                          type="text"
                          name="grade"
                          placeholder="Enter your grade"
                          value={grade}
                          onChange={(e) => {
                            setGrade(e.target.value);
                          }}
                        />
                      </SideBySide>

                      <Button type="submit">Submit</Button>

                      {wrongSubmission && (
                        <WrongRequest>
                          <div>{wrongSubmission}</div>
                        </WrongRequest>
                      )}
                    </div>
                  </Form>

                  <>
                    <div
                      className={
                        toggleState === 2
                          ? "content  active-content"
                          : "content"
                      }
                    >
                      <h2>List of studends with grades</h2>
                      {getStudentGrade &&
                        getStudentGrade?.map((studentGrade) => {
                          console.log("studentGrade: ", studentGrade);
                          // console.log("student grade: ", studentGrade);
                          return <DisplayGrades grade={studentGrade} />;
                        })}
                    </div>
                  </>

                  <div
                    className={
                      toggleState === 3 ? "content  active-content" : "content"
                    }
                  >
                    <h2>Content 3</h2>
                    <hr />
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Eos sed nostrum rerum laudantium totam unde adipisci
                      incidunt modi alias! Accusamus in quia odit aspernatur
                      provident et ad vel distinctio recusandae totam quidem
                      repudiandae omnis veritatis nostrum laboriosam architecto
                      optio rem, dignissimos voluptatum beatae aperiam
                      voluptatem atque. Beatae rerum dolores sunt.
                    </p>
                  </div>
                </ContentTabs>
              </Container>

              <VideoSection>
                <StyledH1>LIVE SESSION</StyledH1>
              </VideoSection>
            </LiveSection>
          </>
        ) : (
          <>
            <StyledH1>ASSIGNMENT MANAGER</StyledH1>
            <LiveSection>
              <Container>
                <BlocTabs>
                  <button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(2)}
                  >
                    List of Students
                  </button>
                </BlocTabs>

                <ContentTabs>
                  <>
                    <div
                      className={
                        toggleState === 2
                          ? "content  active-content"
                          : "content"
                      }
                    >
                      <h2>List of studends with grades</h2>
                      {getStudentGrade &&
                        getStudentGrade?.map((studentGrade) => {
                          console.log("studentGrade: ", studentGrade);
                          return <DisplayGrades grade={studentGrade} />;
                        })}
                    </div>
                  </>
                </ContentTabs>
              </Container>

              <VideoSection>
                <StyledH1>LIVE SESSION</StyledH1>
              </VideoSection>
            </LiveSection>
          </>
        )}
      </Wrapper>

      {/* <ProfileStudents /> */}
    </>
  );
};

const Form = styled.form`
  border-radius: 10px;
  border: 1px solid transparent;
  margin-top: 10px;

  .login-span {
    color: #86bc42;
    margin-bottom: 30px;
  }
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

const H2 = styled.h2`
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: 200;
`;

const SideBySide = styled.div`
  display: flex;
  margin-bottom: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
    margin-bottom: 0;
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

const VideoSection = styled.div`
  width: 480px;
  height: 280px;
  background-color: #eee;
  /* border: 1px solid #000; */
  padding: 20px;
`;

const LiveSection = styled.div`
  display: flex;
  flex-direction: row;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 800px;
  height: 280px;
  margin: 0 auto 0;
  word-break: break-all;
  /* border: 1px solid rgba(0, 0, 0, 0.274); */
`;

const ContentTabs = styled.div`
  flex-grow: 1;
`;

const BlocTabs = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  &.row {
    max-width: 1300px;
    margin: auto;
  }

  // Tabs styling starting here

  .tabs {
    padding: 15px;
    text-align: center;
    width: 50%;
    background: rgba(128, 128, 128, 0.075);
    cursor: pointer;
    border-bottom: 1px solid rgba(0, 0, 0, 0.274);
    box-sizing: content-box;
    position: relative;
    outline: none;
    font-size: 17px;
    font-weight: 500;
  }
  .tabs:not(:last-child) {
    border-right: 1px solid rgba(0, 0, 0, 0.274);
  }

  .active-tabs {
    background: white;
    border-bottom: 1px solid transparent;
  }

  .active-tabs::before {
    content: "";
    display: block;
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% + 2px);
    height: 5px;
    background: rgb(88, 147, 241);
  }

  button {
    border: none;
  }

  .content {
    background: white;
    padding: 20px;
    width: 100%;
    height: 100%;
    display: none;
  }
  .content h2 {
    padding: 0px 0 5px 0px;
    font-size: 20px;
    font-weight: 300;
  }
  .content hr {
    width: 100px;
    /* background: #222; */
    margin-bottom: 5px;
  }
  .content p {
    width: 100%;
    height: 100%;
  }
  .active-content {
    display: block;
  }
`;

const Grid = styled.div`
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  margin-top: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const StyledH1 = styled.h1`
  display: flex;
  margin-top: -10px;
  padding: 25px;
`;

const Depart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px;
`;

const Department = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 280px;
  background: linear-gradient(to top, #86bc42 50%, #fff 50%);
  border: 2px solid #86bc42;
  border-radius: 15px;
  font-size: 25px;
  color: #86bc42;
  font-family: "Teko", sans-serif;
  padding: 50px 20px 0 20px;

  .classes-section {
    margin-top: 130px;
  }

  .full-name {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    /* margin-top: 85px; */
    color: #fff;
  }
`;

const WrongRequest = styled.div`
  color: red;
  text-align: center;
  margin: 15px 0 15px 0;
  font-family: "Teko", sans-serif;
  font-weight: 500;
`;

export default Profile;
