import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ValidateGrade from "./ValidateGrade";
import { SchoolContext } from "../SchoolContext";
import DisplayGrades from "../grades/DisplayGrades";
import ProfileStudents from "./ProfileStudents";
import CourseImage from "../CourseImage";

const Profile = () => {
  const { signedInUser, profileLoaded, authFetch } = useContext(SchoolContext);
  // console.log(signedInUser, "signed in user");

  const [registration, setRegistration] = useState(null);
  const [allInOne, setAllInOne] = useState();
  const [getStudent, setGetStudent] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [studentClasses, setStudentClasses] = useState([]);
  const [getStudentGrade, setGetStudentGrade] = useState([]);
  // console.log("get student grade: ", getStudentGrade);

  const [grade, setGrade] = useState();

  const [wrongSubmission, setWrongSubmission] = useState();
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    if (signedInUser?._id) {
      setRegistration(signedInUser);
    } else {
      setRegistration(null);
    }
  }, [signedInUser]);

  useEffect(() => {
    if (!authFetch) return;

    authFetch("/api/registration?user=student")
      .then((res) => res.json())
      .then((data) => {
        setGetStudent(Array.isArray(data.data) ? data.data : []);
      });
  }, [authFetch]);

  useEffect(() => {
    if (!signedInUser?._id) return;

    if (signedInUser.user === "teacher") {
      fetchGrade();
    } else if (signedInUser.user === "student") {
      fetchGradeStudent();
    }
  }, [signedInUser]);

  const fetchGrade = () => {
    authFetch(`/api/teacher/grade/${signedInUser._id}?user=teacher`)
      .then((res) => res.json())
      .then((data) => {
        setGetStudentGrade(Array.isArray(data.data) ? data.data : []);
      });
  };

  const fetchGradeStudent = () => {
    authFetch(`/api/teacher/grade/${signedInUser._id}?user=student`)
      .then((res) => res.json())
      .then((data) => {
        setGetStudentGrade(Array.isArray(data.data) ? data.data : []);
      });
  };

  useEffect(() => {
    if (!authFetch) return;

    authFetch("/api/grade").then((response) =>
      response.json().then((data) => {
        setAllInOne(Array.isArray(data.data) ? data.data : []);
      })
    );
  }, [authFetch]);

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
      authFetch("/api/grade", {
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

  const teacherStudents = (Array.isArray(getStudent) ? getStudent : []).filter(
    (student) =>
      student.selectedClasses?.some((cls) =>
        signedInUser?.selectedClasses?.includes(cls)
      )
  );

  return (
    <>
      {!profileLoaded ? (
        <Wrapper className="row">
          <EmptyState>Loading your profile...</EmptyState>
        </Wrapper>
      ) : !signedInUser?._id ? (
        <Wrapper className="row">
          <EmptyState>
            <h2>Complete your school portal registration</h2>
            <p>
              Your Clerk account is active, but you still need to submit your
              school profile.
            </p>
            <ProfileLink to="/registration">Go to registration</ProfileLink>
          </EmptyState>
        </Wrapper>
      ) : (
      <Wrapper className="row">
        <Grid>
          <StyledH1>LIST OF MY COURSES</StyledH1>
          <Depart style={{ marginLeft: "20px" }}>
            {registration?.selectedClasses?.map((classes) => {
                return (
                  <Department key={classes}>
                    <CourseTop>
                      <CourseImage courseName={classes} size="large" />
                    </CourseTop>

                    <CourseBottom>
                      {signedInUser.user === "teacher" ? (
                        <>
                          <span className="full-name department">
                            Department: {registration.department}
                          </span>
                          <span className="full-name">
                            {registration.firstName} {registration.lastName}
                          </span>
                          <span className="full-name">
                            {registration.email}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="full-name department">
                            Department: {registration.department}
                          </span>
                          <span className="full-name">
                            {registration.firstName} {registration.lastName}
                          </span>
                        </>
                      )}
                    </CourseBottom>
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
                              return (
                                <option
                                  key={student._id}
                                  value={student._id}
                                >
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
                              return (
                                <option key={classes} value={classes}>
                                  {classes}
                                </option>
                              );
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
                      <span className="grades-head">StudentID</span>
                      <span className="grades-head">Full - name</span>
                      <span className="grades-head">Department</span>
                      <span className="grades-head">Course</span>
                      <span className="grades-head">Grade</span>

                      {getStudentGrade &&
                        getStudentGrade?.map((studentGrade) => {
                          return (
                            <DisplayGrades
                              key={`${studentGrade.studentId}-${studentGrade.studentClasses}`}
                              grade={studentGrade}
                            />
                          );
                        })}
                    </div>
                  </>

                  <div
                    className={
                      toggleState === 3 ? "content  active-content" : "content"
                    }
                  >
                    <h2>Each Course</h2>
                    <div>{}</div>
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
                    Student Grades
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
                      <h2>Grades</h2>
                      <span className="grades-head">StudentID</span>
                      <span className="grades-head">Full - name</span>
                      <span className="grades-head">Department</span>
                      <span className="grades-head">Course</span>
                      <span className="grades-head">Grade</span>

                      {getStudentGrade &&
                        getStudentGrade?.map((studentGrade) => {
                          return (
                            <DisplayGrades
                              key={`${studentGrade.studentId}-${studentGrade.studentClasses}`}
                              grade={studentGrade}
                            />
                          );
                        })}
                    </div>
                  </>
                  <div
                    className={
                      toggleState === 3 ? "content  active-content" : "content"
                    }
                  >
                    <h2>Each Course</h2>
                    {/* <hr /> */}
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
        )}
      </Wrapper>
      )}
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
  min-height: 280px;
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
  min-height: auto;
  padding-bottom: 40px;

  &.row {
    max-width: 1300px;
    margin: auto;
  }

  .grades-head {
    margin-right: 65px;
    font-size: 18px;
    font-weight: 600;
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
    min-height: auto;
    display: none;
  }
  .content h2 {
    padding: 0px 0 5px 0px;
    font-size: 20px;
    font-weight: 300;
    margin-bottom: 30px;
    margin-right: 70px;
  }
  .content hr {
    width: 100px;
    /* background: #222; */
    margin-bottom: 5px;
  }
  .content p {
    width: 100%;
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
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 30px;
`;

const Department = styled.div`
  display: flex;
  flex-direction: column;
  width: 220px;
  min-height: 260px;
  border: 2px solid #86bc42;
  border-radius: 15px;
  overflow: hidden;
  font-family: "Teko", sans-serif;
`;

const CourseTop = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px 14px 16px;
  background: #fff;
`;

const CourseBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  padding: 16px 14px;
  background: #86bc42;
  min-height: 110px;

  .full-name {
    display: block;
    font-size: 13px;
    line-height: 1.3;
    color: #fff;
    word-break: break-word;
  }

  .department {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 4px;
  }
`;

const WrongRequest = styled.div`
  color: red;
  text-align: center;
  margin: 15px 0 15px 0;
  font-family: "Teko", sans-serif;
  font-weight: 500;
`;

const EmptyState = styled.div`
  max-width: 640px;
  margin: 80px auto;
  padding: 32px;
  text-align: center;
  background: #fff;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);

  h2 {
    margin-bottom: 12px;
    color: #333;
  }

  p {
    margin-bottom: 20px;
    color: #666;
    line-height: 1.5;
  }
`;

const ProfileLink = styled(Link)`
  display: inline-block;
  padding: 12px 20px;
  border-radius: 8px;
  background: #86bc42;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
`;

export default Profile;
