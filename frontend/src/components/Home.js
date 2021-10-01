import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { SchoolContext } from "./SchoolContext";

const Home = () => {
  const { faculties } = useContext(SchoolContext);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  // const [isSelected, setIsSelected] = useState(null);

  // console.log(selectedFaculty, ": selectedFaculty");

  useEffect(() => {
    setTimeout(() => setSelectedFaculty("Science"), 3000);
  }, []);

  return (
    <>
      <Wrapper className="row">
        <Grid>
          <StyledH1>POPULAR DEPARTMENTS</StyledH1>
          <Depart style={{ marginLeft: "20px" }}>
            {faculties &&
              faculties.map((fact) => {
                const isSelected = fact.faculty === selectedFaculty;

                setSelectedFaculty(fact.faculty);

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
      </Wrapper>
    </>
  );
};

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
  height: 100vh;

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
  }
  .content hr {
    width: 100px;
    /* height: 2px; */
    background: #222;
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

const StyledFilters = styled.div`
  display: flex;
  justify-content: center;
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
  padding: 20px;
  ${(props) => props.isSelected && { border: "2px solid black" }}
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
