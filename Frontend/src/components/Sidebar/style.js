import styled from "styled-components";
import { Link } from "react-router-dom";

export const SidebarContainer = styled.div`
  height: 100vh;
  background-color: rgb(73, 82, 75);
  transition: width 0.3s ease-in-out;
  width: ${(props) => (props.isOpen ? "200px" : "60px")};
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
  overflow-x: hidden;
  padding-top: 10px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const ToggleButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background: #4d8f65;
  color: white;
  position: fixed;
  left: ${(props) => (props.isOpen ? "180px" : "40px")};
  top: 20px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  box-shadow: 0 2px 5px rgba(122, 146, 107, 0.4);
  transition: left 0.3s ease, background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #3a6b4c;
    transform: scale(1.1);
  }

  span {
    white-space: nowrap;
    opacity: ${(props) => (props.show ? 1 : 0)};
    transition: opacity 0.3s ease;
  }
`;

export const NavMenu = styled.nav`
  padding: 20px 0;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

export const NavMenuItem = styled.li`
  margin: 5px 0;
  background-color: ${(props) =>
    props.$isActive ? "#4d8f65;" : "transparent"};
  border-left: ${(props) =>
    props.$isActive ? "4px solid #4d8f65;" : "4px solid transparent"};
  transition: background-color 0.3s ease, border-left 0.3s ease;

  &:hover {
    background-color: #3a6b4c;
  }
`;

export const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: background-color 0.3s, color 0.3s;
  overflow: hidden;

  svg {
    flex-shrink: 0;
  }

  span {
    white-space: nowrap;
    opacity: ${(props) => (props.$isOpen ? 1 : 0)};
    transition: opacity 0.3s ease;
    font-size: 1.05em;
  }
`;

export const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.05em;
  padding: 10px 15px;
  width: 100%;
  text-align: left;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 105, 180, 0.1);
  }

  span {
    white-space: nowrap;
    opacity: ${(props) => (props.$isOpen ? 1 : 0)};
    transition: opacity 0.3s ease;
  }
`;
