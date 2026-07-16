import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  FiHome,
  FiUser,
  FiBookmark,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { SchoolContext } from "./SchoolContext";

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: FiHome, exact: true },
  { to: "/profile", label: "My Profile", icon: FiUser },
  { to: "/registration", label: "Register", icon: FiBookmark },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { email } = useContext(SchoolContext);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((open) => !open);

  return (
    <>
      <MenuButton
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={toggleMenu}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </MenuButton>

      <Overlay $isOpen={isOpen} onClick={closeMenu} />

      <SidebarStyle $isOpen={isOpen}>
        <SidebarHeader>
          <SidebarTitle>Menu</SidebarTitle>
          <CloseButton type="button" aria-label="Close menu" onClick={closeMenu}>
            <FiX />
          </CloseButton>
        </SidebarHeader>

        <NavList>
          {NAV_ITEMS.map(({ to, label, icon: Icon, exact }) => (
            <NavItem
              key={label}
              to={to}
              exact={exact}
              onClick={closeMenu}
              activeClassName="active"
            >
              <Icon className="icon" />
              <span>{label}</span>
            </NavItem>
          ))}
        </NavList>

        {email && (
          <UserSection>
            <UserLabel>Signed in as</UserLabel>
            <UserEmail>{email}</UserEmail>
          </UserSection>
        )}
      </SidebarStyle>
    </>
  );
};

const MenuButton = styled.button`
  display: none;
  position: fixed;
  top: 72px;
  left: 16px;
  z-index: 1100;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 8px;
  background: #86bc42;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  @media (max-width: 900px) {
    display: flex;
  }
`;

const Overlay = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: ${(props) => (props.$isOpen ? "block" : "none")};
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1000;
  }
`;

const SidebarStyle = styled.aside`
  display: flex;
  flex-direction: column;
  width: 240px;
  min-width: 240px;
  min-height: calc(100vh - 60px);
  background-color: #f8f8f8;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  padding: 24px 0;
  position: sticky;
  top: 60px;
  align-self: flex-start;

  @media (max-width: 900px) {
    position: fixed;
    top: 60px;
    left: 0;
    z-index: 1050;
    min-height: calc(100vh - 60px);
    transform: translateX(${(props) => (props.$isOpen ? "0" : "-100%")});
    transition: transform 0.25s ease;
    box-shadow: ${(props) =>
      props.$isOpen ? "4px 0 16px rgba(0, 0, 0, 0.12)" : "none"};
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  margin-bottom: 12px;
`;

const SidebarTitle = styled.h2`
  margin: 0;
  font-family: "Teko", sans-serif;
  font-size: 24px;
  color: #86bc42;
  font-weight: 600;
`;

const CloseButton = styled.button`
  display: none;
  border: none;
  background: transparent;
  font-size: 22px;
  color: #666;
  cursor: pointer;
  padding: 4px;

  @media (max-width: 900px) {
    display: flex;
    align-items: center;
  }
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 12px;
  flex: 1;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 14px;
  border-radius: 8px;
  text-decoration: none;
  color: #444;
  font-size: 15px;
  font-weight: 500;
  transition: background-color 0.2s ease, color 0.2s ease;

  .icon {
    font-size: 18px;
    flex-shrink: 0;
  }

  &:hover {
    background-color: rgba(134, 188, 66, 0.12);
    color: #5e8f2e;
  }

  &.active {
    background-color: #86bc42;
    color: #fff;
  }
`;

const UserSection = styled.div`
  margin-top: auto;
  padding: 16px 20px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
`;

const UserLabel = styled.span`
  display: block;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #888;
  margin-bottom: 4px;
`;

const UserEmail = styled.span`
  display: block;
  font-size: 13px;
  color: #333;
  word-break: break-all;
`;

export default Sidebar;
