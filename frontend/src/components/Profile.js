import React, { useState } from "react";
import styled from "styled-components";

const Profile = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  // const [value, setValue] = React.useState(2);

  return (
    <>
      <Wrapper className="row">
        <Grid>
          <StyledH1>LIST OF MY COURSES</StyledH1>
          <Depart style={{ marginLeft: "20px" }}>
            <Department></Department>
            <Department></Department>
            <Department></Department>
            <Department></Department>
          </Depart>
        </Grid>
        <StyledH1>ASSIGNMENT MANAGER</StyledH1>
        <LiveSection>
          <Container>
            <BlocTabs>
              <button
                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(1)}
              >
                Pending
              </button>
              <button
                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(2)}
              >
                Completed
              </button>
              <button
                className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(3)}
              >
                Submitted
              </button>
            </BlocTabs>

            <ContentTabs>
              <div
                className={
                  toggleState === 1 ? "content  active-content" : "content"
                }
              >
                <h2>Content 1</h2>
                <hr />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati praesentium incidunt quia aspernatur quasi quidem
                  facilis quo nihil vel voluptatum?
                </p>
              </div>

              <div
                className={
                  toggleState === 2 ? "content  active-content" : "content"
                }
              >
                <h2>Content 2</h2>
                <hr />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Sapiente voluptatum qui adipisci.
                </p>
              </div>

              <div
                className={
                  toggleState === 3 ? "content  active-content" : "content"
                }
              >
                <h2>Content 3</h2>
                <hr />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos
                  sed nostrum rerum laudantium totam unde adipisci incidunt modi
                  alias! Accusamus in quia odit aspernatur provident et ad vel
                  distinctio recusandae totam quidem repudiandae omnis veritatis
                  nostrum laboriosam architecto optio rem, dignissimos
                  voluptatum beatae aperiam voluptatem atque. Beatae rerum
                  dolores sunt.
                </p>
              </div>
            </ContentTabs>
          </Container>

          <VideoSection>
            <StyledH1>LIVE SESSION</StyledH1>
          </VideoSection>
        </LiveSection>
      </Wrapper>
    </>
  );
};

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
  width: 250px;
  height: 280px;
  background-color: #eee;
  /* border: 1px solid #000; */
  padding: 20px;
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

export default Profile;
