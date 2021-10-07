import React, { useState, useContext } from "react";
import styled from "styled-components";
import CoursesStructure from "./CoursesStructure";
import { SchoolContext } from "./SchoolContext";

const Home = () => {
  const { faculties } = useContext(SchoolContext);
  const [selectedFaculty, setSelectedFaculty] = useState("Science");
  // const [isSelected, setIsSelected] = useState(null);

  // useEffect(() => {
  //   setTimeout(() => setSelectedFaculty("Science"), 3000);
  // }, []);

  const filterByFaculty =
    faculties?.filter((fact) => {
      return fact.faculty === selectedFaculty;
    }) || undefined;

  return (
    <>
      <Wrapper className="row">
        <Grid>
          <StyledH1>POPULAR DEPARTMENTS</StyledH1>
          <Depart style={{ marginLeft: "20px" }}>
            {faculties &&
              faculties.map((fact) => {
                const isSelected = fact.faculty === selectedFaculty;
                return (
                  <Department
                    key={`department-${fact.faculty}`}
                    isSelected={isSelected}
                  >
                    <SpanFact>{fact.faculty}</SpanFact>
                    <SpanMessage>{fact.message}</SpanMessage>
                  </Department>
                );
              })}
          </Depart>
        </Grid>

        <SideBySide>
          <select
            className="select-role"
            name="role"
            onChange={(e) => {
              setSelectedFaculty(e.target.value);
            }}
            value={selectedFaculty}
          >
            <option value="" hidden>
              Faculty
            </option>
            {faculties &&
              faculties.map((fact) => {
                return (
                  <option value={fact.faculty} key={`option-${fact.faculty}`}>
                    {fact.faculty}
                  </option>
                );
              })}
          </select>
        </SideBySide>

        {filterByFaculty &&
          filterByFaculty?.map((faculty) => {
            return faculty.courses.map((course) => {
              return (
                <EachDepartment>
                  <li className="single-year">
                    <CoursesStructure courses={course} />
                  </li>
                </EachDepartment>
              );
            });
          })}
      </Wrapper>
    </>
  );
};

const EachDepartment = styled.div`
  float: left;
  margin: 20px 0 0 90px;
  align-items: center;
  box-sizing: "border-box";
  width: 280px;
  height: 260px;
  /* background-color: #eee; */
  border: 2px solid #fff;
  padding: 20px;

  .single-year {
    padding: 5px;
    list-style: none;
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

const Wrapper = styled.div`
  width: 100%;
  height: 110vh;

  &.row {
    max-width: 1200px;
    margin: auto;
  }

  .select-role {
    flex: 1;
    width: 200px;
    height: 42px;
    letter-spacing: 1px;
    background-color: transparent;
    border: 1px solid rgba(0, 0, 0, 0.25);
    padding: 0 16px;
    margin-right: 8px;
    color: #808080;
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
  justify-content: center;
  align-items: center;
`;

const Depart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px;
`;

const Department = styled.div`
  box-sizing: "border-box";
  width: 350px;
  height: 280px;
  background-color: #eee;
  border: 2px solid #fff;
  margin-bottom: 25px;
  padding: 20px;
  ${(props) => props.isSelected && { border: "2px solid black" }}

  &:hover {
    border: 2px solid #86bc42;
    background-color: #fff;
    transition: transform 0.4s, opacity 0.5s ease-in-out;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
      0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
      0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
      0 100px 80px rgba(0, 0, 0, 0.07);
  }
`;

const SpanFact = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  font-size: 28px;
  font-family: "Teko", sans-serif;
  color: #86bc42;

  &:hover {
  }
`;
const SpanMessage = styled.span`
  text-align: justify;
  font-size: 18px;
`;

export default Home;
