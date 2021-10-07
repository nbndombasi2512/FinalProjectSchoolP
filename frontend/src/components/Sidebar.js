import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiBookmark, FiHome, FiBell, FiUser } from "react-icons/fi";

const Sidebar = () => {
  return (
    <SidebarStyle>
      <>
        <div className="navLink">
          <NavLink className="nav-item" exact to="/">
            <FiHome className="icon" /> Home
          </NavLink>

          <NavLink className="nav-item" exact to={"/"}>
            <FiUser className="icon" /> Scheduler
          </NavLink>

          <NavLink className="nav-item" exact to="/Notifications">
            <FiBell className="icon" />
            Notifications
          </NavLink>

          <NavLink className="nav-item" exact to="/Bookmarks">
            <FiBookmark className="icon" /> Submission
          </NavLink>
        </div>
      </>
    </SidebarStyle>
  );
};

const SidebarStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 15vw;
  max-width: 25rem;
  padding-top: 15px;

  .nav-item {
    display: flex;
    text-decoration: none;
    margin: 50px;
  }

  .icon {
    margin-right: 25px;
    font-size: 20px;
  }

  .btn-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  background-color: #f6f6f6;
`;

export default Sidebar;
