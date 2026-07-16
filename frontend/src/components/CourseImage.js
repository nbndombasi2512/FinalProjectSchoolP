import React from "react";
import styled from "styled-components";
import { getCourseImage } from "../utils/courseImages";

const CourseImage = ({ courseName, size = "medium", showName = true }) => {
  return (
    <Wrapper size={size}>
      <img src={getCourseImage(courseName)} alt={courseName} />
      {showName && <span>{courseName}</span>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  img {
    width: ${(props) =>
      props.size === "large" ? "72px" : props.size === "small" ? "36px" : "48px"};
    height: ${(props) =>
      props.size === "large" ? "72px" : props.size === "small" ? "36px" : "48px"};
    object-fit: contain;
  }

  span {
    font-size: ${(props) =>
      props.size === "large" ? "18px" : props.size === "small" ? "14px" : "16px"};
    color: #86bc42;
    font-family: "Teko", sans-serif;
    text-align: center;
    line-height: 1.25;
    word-break: break-word;
    max-width: 100%;
  }
`;

export default CourseImage;
