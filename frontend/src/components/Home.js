import React, { useState, useContext } from "react";
import styled from "styled-components";
import CoursesStructure from "./CoursesStructure";
import { SchoolContext } from "./SchoolContext";

const Home = () => {
  const { faculties } = useContext(SchoolContext);
  const [selectedFaculty, setSelectedFaculty] = useState("Science");

  const filterByFaculty =
    faculties?.filter((fact) => fact.faculty === selectedFaculty) || [];

  return (
    <Wrapper>
      <Section>
        <StyledH1>Popular Departments</StyledH1>
        <DepartmentGrid>
          {faculties?.map((fact) => {
            const isSelected = fact.faculty === selectedFaculty;
            return (
              <Department
                key={`department-${fact.faculty}`}
                isSelected={isSelected}
                onClick={() => setSelectedFaculty(fact.faculty)}
                type="button"
              >
                <SpanFact>{fact.faculty}</SpanFact>
                <SpanMessage>{fact.message}</SpanMessage>
              </Department>
            );
          })}
        </DepartmentGrid>
      </Section>

      <Section>
        <FilterRow>
          <FilterLabel htmlFor="faculty-filter">Filter by faculty</FilterLabel>
          <FacultySelect
            id="faculty-filter"
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
          >
            {faculties?.map((fact) => (
              <option value={fact.faculty} key={`option-${fact.faculty}`}>
                {fact.faculty}
              </option>
            ))}
          </FacultySelect>
        </FilterRow>

        <CoursesGrid>
          {filterByFaculty.map((faculty) =>
            faculty.courses.map((course) => (
              <CourseCard key={`${faculty.faculty}-${course.year}`}>
                <CoursesStructure courses={course} />
              </CourseCard>
            ))
          )}
        </CoursesGrid>
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px 80px;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const StyledH1 = styled.h1`
  text-align: center;
  margin: 0 0 28px;
  font-family: "Teko", sans-serif;
  font-size: 32px;
  color: #333;
`;

const DepartmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Department = styled.button`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: left;
  width: 100%;
  min-height: 200px;
  background-color: #f5f5f5;
  border: 2px solid ${(props) => (props.isSelected ? "#86bc42" : "#e8e8e8")};
  border-radius: 12px;
  margin: 0;
  padding: 20px;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  box-shadow: ${(props) =>
    props.isSelected ? "0 4px 16px rgba(134, 188, 66, 0.2)" : "none"};

  &:hover {
    border-color: #86bc42;
    background-color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const SpanFact = styled.span`
  display: block;
  text-align: center;
  margin-bottom: 12px;
  font-size: 26px;
  font-family: "Teko", sans-serif;
  color: #86bc42;
  font-weight: 600;
`;

const SpanMessage = styled.p`
  margin: 0;
  text-align: left;
  font-size: 14px;
  line-height: 1.5;
  color: #555;
`;

const FilterRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 320px;
  margin-bottom: 28px;
`;

const FilterLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #444;
`;

const FacultySelect = styled.select`
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  background: #fff;
  font-size: 15px;
  color: #333;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #86bc42;
    box-shadow: 0 0 0 3px rgba(134, 188, 66, 0.12);
  }
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
`;

const CourseCard = styled.div`
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  padding: 20px;
  background: #fff;
`;

export default Home;
