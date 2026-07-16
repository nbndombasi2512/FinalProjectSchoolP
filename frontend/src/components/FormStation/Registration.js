import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Validate from "./Validate";
import { SchoolContext } from "../SchoolContext";
import CheckboxComponent from "../CheckboxComponent";

const YEAR_OPTIONS = [
  { value: "firstYear", label: "First year" },
  { value: "secondYear", label: "Second year" },
  { value: "thirdYear", label: "Third year" },
];

const MAX_CLASSES = 4;

const Confirmation = ({ firstName, lastName, selectedClasses }) => (
  <SuccessCard>
    <SuccessTitle>Registration successful</SuccessTitle>
    <SuccessMessage>
      {firstName} {lastName}, your account has been created.
    </SuccessMessage>
    {selectedClasses.length > 0 && (
      <CourseSummary>
        <span>Selected courses:</span>
        <ul>
          {selectedClasses.map((course) => (
            <li key={course}>{course}</li>
          ))}
        </ul>
      </CourseSummary>
    )}
    <SignInLink to="/profile">Go to your profile</SignInLink>
  </SuccessCard>
);

const Registration = () => {
  const { faculties, email, authFetch, refreshUserProfile } =
    useContext(SchoolContext);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [courses, setCourses] = useState({});
  const [registered, setRegistered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wrongSubmission, setWrongSubmission] = useState(null);
  const [classLimitError, setClassLimitError] = useState(null);

  const [form, setForm] = useState({
    department: "",
    year: "",
    firstName: "",
    lastName: "",
    gender: "",
    address: "",
    user: "",
    phoneNumber: "",
    city: "",
    location: "",
    country: "",
    zip: "",
    email: "",
  });

  useEffect(() => {
    if (email) {
      setForm((prev) => ({ ...prev, email }));
    }
  }, [email]);

  const updateField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setWrongSubmission(null);
  };

  const departmentOptions =
    faculties?.map((fact) => fact.faculty) || [
      "Science",
      "Administration",
      "Education",
    ];

  useEffect(() => {
    setSelectedClasses([]);
    setClassLimitError(null);

    if (!form.department || !form.year || !faculties?.length) {
      setCourses({});
      return;
    }

    const matchedFaculty = faculties.find(
      (fact) => fact.faculty === form.department
    );

    if (!matchedFaculty?.courses) {
      setCourses({});
      return;
    }

    const matchedCourses = matchedFaculty.courses.find(
      (course) => course.year === form.year
    );
    setCourses(matchedCourses || {});
  }, [form.department, form.year, faculties]);

  const idGenerateStudentStaff = (year, role) => {
    const val = Math.floor(1000 + Math.random() * 9000);

    if (role === "teacher") {
      return `2015${val}`;
    }

    if (year === "firstYear") return `2021${val}`;
    if (year === "secondYear") return `2020${val}`;
    if (year === "thirdYear") return `2019${val}`;
    return `2021${val}`;
  };

  const handleClassChange = (ev) => {
    const selectedCourse = ev.target.value;
    setClassLimitError(null);

    if (!ev.target.checked) {
      setSelectedClasses((curr) => curr.filter((e) => e !== selectedCourse));
      return;
    }

    if (selectedClasses.length >= MAX_CLASSES) {
      setClassLimitError(`You can select up to ${MAX_CLASSES} courses.`);
      return;
    }

    setSelectedClasses((curr) =>
      Array.from(new Set([...curr, selectedCourse]))
    );
  };

  const handleRegistrationInfo = async (e) => {
    e.preventDefault();
    setWrongSubmission(null);
    setClassLimitError(null);

    if (!form.department) {
      setWrongSubmission("Please select a department.");
      return;
    }

    if (!form.year) {
      setWrongSubmission("Please select your year.");
      return;
    }

    if (form.user === "student" && selectedClasses.length === 0) {
      setWrongSubmission("Please select at least one course.");
      return;
    }

    const validationStatus = Validate({
      department: form.department,
      courses,
      studentStaff: form.year,
      firstName: form.firstName,
      lastName: form.lastName,
      gender: form.gender,
      email: form.email,
      address: form.address,
      user: form.user,
      phoneNumber: form.phoneNumber,
      city: form.city,
      location: form.location,
      country: form.country,
      zip: form.zip,
      image: "",
    });

    if (validationStatus !== "good") {
      setWrongSubmission(validationStatus);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await authFetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: idGenerateStudentStaff(form.year, form.user),
          department: form.department,
          year: form.year,
          firstName: form.firstName,
          lastName: form.lastName,
          selectedClasses,
          gender: form.gender,
          email: form.email,
          address: form.address,
          user: form.user,
          phoneNumber: form.phoneNumber,
          city: form.city,
          location: form.location,
          country: form.country,
          zip: form.zip,
          image: "",
        }),
      });

      const data = await response.json();

      if (data.status === 200) {
        refreshUserProfile();
        setRegistered(true);
        return;
      }

      if (data.status === 400) {
        setWrongSubmission(data.error);
        return;
      }

      setWrongSubmission(data.error || "Registration failed. Please try again.");
    } catch (error) {
      console.error("ERROR:", error);
      setWrongSubmission("Sorry, we are having server issues at the moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      {!registered ? (
        <Form onSubmit={handleRegistrationInfo}>
          <FormHeader>
            <Title>Create your account</Title>
            <FormHint>Fill in your details to register for the school portal.</FormHint>
          </FormHeader>

          <Section>
            <Subtitle>Academic information</Subtitle>

            <FieldGroup>
              <Label htmlFor="department">Department</Label>
              <Select
                id="department"
                name="department"
                value={form.department}
                onChange={updateField("department")}
              >
                <option value="" hidden>
                  Select department
                </option>
                {departmentOptions.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </Select>
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="year">Year</Label>
              <Select
                id="year"
                name="year"
                value={form.year}
                onChange={updateField("year")}
              >
                <option value="" hidden>
                  Select your year
                </option>
                {YEAR_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            </FieldGroup>

            {form.user !== "teacher" && (
              <CourseSection>
                <CourseHeader>
                  <Label>Courses</Label>
                  <CourseCount>
                    {selectedClasses.length}/{MAX_CLASSES} selected
                  </CourseCount>
                </CourseHeader>

                {!form.department || !form.year ? (
                  <CourseHint>
                    Select a department and year to view available courses.
                  </CourseHint>
                ) : courses?.classes?.length ? (
                  <CourseGrid>
                    {courses.classes.map((course) => (
                      <CourseOption key={course}>
                        <CheckboxComponent
                          name={course}
                          checked={selectedClasses.includes(course)}
                          handleOnChange={handleClassChange}
                        />
                      </CourseOption>
                    ))}
                  </CourseGrid>
                ) : (
                  <CourseHint>No courses available for this selection.</CourseHint>
                )}

                {classLimitError && (
                  <InlineError>{classLimitError}</InlineError>
                )}
              </CourseSection>
            )}

            <FieldRow>
              <FieldGroup>
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={form.firstName}
                  onChange={updateField("firstName")}
                />
              </FieldGroup>

              <FieldGroup>
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={updateField("lastName")}
                />
              </FieldGroup>
            </FieldRow>

            <FieldRow>
              <FieldGroup>
                <Label htmlFor="gender">Gender</Label>
                <Select
                  id="gender"
                  name="gender"
                  value={form.gender}
                  onChange={updateField("gender")}
                >
                  <option value="">Select gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </Select>
              </FieldGroup>

              <FieldGroup>
                <Label htmlFor="user">Role</Label>
                <Select
                  id="user"
                  name="user"
                  value={form.user}
                  onChange={updateField("user")}
                >
                  <option value="">Choose a role</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </Select>
              </FieldGroup>
            </FieldRow>
          </Section>

          <Section>
            <Subtitle>Contact information</Subtitle>

            <FieldGroup>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                name="address"
                placeholder="Street address"
                value={form.address}
                onChange={updateField("address")}
              />
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="phoneNumber">Phone number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                placeholder="+1 (514) 500-5000"
                value={form.phoneNumber}
                maxLength="17"
                onChange={updateField("phoneNumber")}
              />
            </FieldGroup>

            <FieldRow>
              <FieldGroup>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  type="text"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={updateField("city")}
                />
              </FieldGroup>

              <FieldGroup>
                <Label htmlFor="location">Province</Label>
                <Input
                  id="location"
                  type="text"
                  name="location"
                  placeholder="Province / State"
                  value={form.location}
                  onChange={updateField("location")}
                />
              </FieldGroup>
            </FieldRow>

            <FieldRow>
              <FieldGroup>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={form.country}
                  onChange={updateField("country")}
                />
              </FieldGroup>

              <FieldGroup>
                <Label htmlFor="zip">Postal code</Label>
                <Input
                  id="zip"
                  type="text"
                  name="zip"
                  placeholder="Postal code"
                  maxLength="10"
                  value={form.zip}
                  onChange={updateField("zip")}
                />
              </FieldGroup>
            </FieldRow>
          </Section>

          <Section>
            <Subtitle>Account</Subtitle>

            <FieldGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={form.email}
                readOnly
                disabled
              />
              <AccountHint>
                This email comes from your Clerk account and cannot be changed here.
              </AccountHint>
            </FieldGroup>
          </Section>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing up..." : "Sign up"}
          </Button>

          {wrongSubmission && <WrongRequest>{wrongSubmission}</WrongRequest>}

          <SpanStyled>
            Already signed in with Clerk?{" "}
            <Link to="/profile">Go to your profile</Link>
          </SpanStyled>
        </Form>
      ) : (
        <Confirmation
          firstName={form.firstName}
          lastName={form.lastName}
          selectedClasses={selectedClasses}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 20px 80px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 640px;
  background-color: #fff;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  padding: 32px 36px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const FormHeader = styled.div`
  margin-bottom: 28px;
`;

const Title = styled.h2`
  margin: 0 0 8px;
  color: #333;
  font-family: "Teko", sans-serif;
  font-size: 32px;
  font-weight: 600;
`;

const FormHint = styled.p`
  margin: 0;
  color: #777;
  font-size: 14px;
  line-height: 1.5;
`;

const Section = styled.div`
  margin-bottom: 28px;
`;

const Subtitle = styled.h3`
  text-transform: uppercase;
  font-weight: 600;
  margin: 0 0 18px;
  color: #86bc42;
  font-family: "Teko", sans-serif;
  font-size: 20px;
  letter-spacing: 0.5px;
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 18px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
  min-width: 0;
  width: 100%;

  ${FieldRow} & {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #444;
  line-height: 1.2;
`;

const inputStyles = `
  width: 100%;
  height: 44px;
  box-sizing: border-box;
  letter-spacing: 0.2px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.22);
  border-radius: 8px;
  padding: 0 14px;
  color: #222;
  font-size: 15px;
  font-family: inherit;

  &::placeholder {
    color: #999;
    font-size: 14px;
  }

  &:focus {
    outline: none;
    border-color: #86bc42;
    box-shadow: 0 0 0 3px rgba(134, 188, 66, 0.12);
  }
`;

const Input = styled.input`
  ${inputStyles}
`;

const Select = styled.select`
  ${inputStyles}
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23666' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
  cursor: pointer;
  color: ${(props) => (props.value ? "#222" : "#999")};
`;

const CourseSection = styled.div`
  margin-bottom: 8px;
`;

const CourseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CourseCount = styled.span`
  font-size: 12px;
  color: #86bc42;
  font-weight: 600;
`;

const CourseHint = styled.p`
  margin: 0;
  padding: 12px;
  background: #f7f7f7;
  border-radius: 6px;
  color: #777;
  font-size: 13px;
`;

const AccountHint = styled.p`
  margin: 8px 0 0;
  color: #777;
  font-size: 13px;
  line-height: 1.4;
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px;
`;

const CourseOption = styled.div`
  padding: 8px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  background: #fafafa;

  .course-checkbox {
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }

  .course-checkbox label {
    display: flex;
    align-items: center;
    cursor: pointer;
    flex: 1;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #86bc42;
  width: 100%;
  height: 44px;
  margin-top: 8px;
  border-radius: 8px;
  border: transparent;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    cursor: pointer;
    background-color: #628a30;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SpanStyled = styled.p`
  margin: 20px 0 0;
  text-align: center;
  color: #888;
  font-size: 14px;

  a {
    color: #86bc42;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const WrongRequest = styled.div`
  color: #c0392b;
  text-align: center;
  margin-top: 16px;
  padding: 10px 12px;
  background: #fdecea;
  border-radius: 6px;
  font-size: 14px;
`;

const InlineError = styled.p`
  margin: 8px 0 0;
  color: #c0392b;
  font-size: 13px;
`;

const SuccessCard = styled.div`
  width: 100%;
  max-width: 480px;
  padding: 40px 32px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid rgba(134, 188, 66, 0.3);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  text-align: center;
`;

const SuccessTitle = styled.h2`
  margin: 0 0 12px;
  color: #86bc42;
  font-family: "Teko", sans-serif;
  font-size: 32px;
`;

const SuccessMessage = styled.p`
  margin: 0 0 20px;
  color: #444;
  font-size: 16px;
  line-height: 1.5;
`;

const CourseSummary = styled.div`
  margin-bottom: 24px;
  text-align: left;
  background: #f7f7f7;
  border-radius: 8px;
  padding: 16px;

  span {
    display: block;
    font-weight: 600;
    margin-bottom: 8px;
    color: #555;
  }

  ul {
    margin: 0;
    padding-left: 18px;
    color: #666;
  }

  li {
    margin-bottom: 4px;
  }
`;

const SignInLink = styled(Link)`
  display: inline-block;
  padding: 12px 24px;
  background: #86bc42;
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;

  &:hover {
    background: #628a30;
  }
`;

export default Registration;
