import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedinIn,
  FaInstagramSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <FooterStyled>
      <div className="row">
        <FooterTitle>Address</FooterTitle>

        <FooterLink to="#">
          <span>
            MONTREAL CAMPUS
            <br />
            8933 Sherbrooke Road
            <br />
            Montreal, H1K 1E6 <br />
            Tel.: +1 438 900 8080 <br />
          </span>
        </FooterLink>

        <FooterLink to="#">
          <span>
            LONGUEUIL CAMPUS
            <br />
            2354 Weather Road
            <br />
            Longueuil, B1K 1A6 <br />
            Tel.: +1 438 700 4040 <br />
          </span>
        </FooterLink>
      </div>

      <div className="row">
        <FooterTitle>QUICK LINKS</FooterTitle>

        <FooterLink to="#">Terms and conditions</FooterLink>
        <FooterLink to="#">Privacy policy</FooterLink>
      </div>

      <div className="row">
        <FooterTitle>follow us</FooterTitle>

        <Icons>
          <FooterLink to="#">
            <FaFacebook />
          </FooterLink>
          <FooterLink to="#">
            <FaTwitter />
          </FooterLink>
          <FooterLink to="#">
            <FaLinkedinIn />
          </FooterLink>
          <FooterLink to="#">
            <FaInstagramSquare />
          </FooterLink>
        </Icons>
      </div>
    </FooterStyled>
  );
};

const FooterStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 40px;
  margin-top: auto;
  background-color: #86bc42;

  .row {
    max-width: 1200px;
    margin: auto;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 16px;

    & > div {
      margin-bottom: 40px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const FooterTitle = styled.div`
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 24px;

  @media (max-width: 600px) {
    font-size: 14px;
    margin-bottom: 16px;
  }
`;

const FooterLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
  opacity: 0.75;
  transition: opacity 0.3s;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    opacity: 1;
  }
`;

const Icons = styled.div`
  display: flex;
  font-size: 25px;

  & > a {
    margin-right: 32px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export default Footer;
