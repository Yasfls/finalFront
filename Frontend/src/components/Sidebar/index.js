import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SidebarContainer, ToggleButton, NavMenu } from "./style";
import { isAuthenticated, logout } from "../../services/auth";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineDashboard,
  AiOutlineLogout,
  AiOutlineShoppingCart,
  AiOutlineOrderedList,
} from "react-icons/ai";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;
  const authenticated = isAuthenticated();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <ToggleButton onClick={toggleSidebar}>
        {isOpen ? "←" : "→"}
      </ToggleButton>
      <NavMenu isOpen={isOpen}>
        <ul>
          <li className={isActive("/") ? "active" : ""}>
            <Link to="/">
              <AiOutlineHome size={20} />
              {isOpen && <span>Home</span>}
            </Link>
          </li>

          {!authenticated ? (
            <>
              <li className={isActive("/login") ? "active" : ""}>
                <Link to="/login">
                  <AiOutlineLogin size={20} />
                  {isOpen && <span>Login</span>}
                </Link>
              </li>
              <li className={isActive("/register") ? "active" : ""}>
                <Link to="/register">
                  <AiOutlineUserAdd size={20} />
                  {isOpen && <span>Register</span>}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={isActive("/app") ? "active" : ""}>
                <Link to="/app">
                  <AiOutlineDashboard size={20} />
                  {isOpen && <span>Dashboard</span>}
                </Link>
              </li>
              <li className={isActive("/products") ? "active" : ""}>
                <Link to="/products">
                  <AiOutlineShoppingCart size={20} />
                  {isOpen && <span>Produtos</span>}
                </Link>
              </li>
              <li className={isActive("/orders") ? "active" : ""}>
                <Link to="/orders">
                  <AiOutlineOrderedList size={20} />
                  {isOpen && <span>Pedidos</span>}
                </Link>
              </li>
              <li>
                {}
                <button
                  onClick={handleLogout}
                  style={{
                    background: "none",
                    border: "none",
                    color: "inherit",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1rem",
                    padding: 0,
                  }}
                >
                  <AiOutlineLogout size={20} />
                  {isOpen && <span>Logout</span>}
                </button>
              </li>
            </>
          )}
        </ul>
      </NavMenu>
    </SidebarContainer>
  );
};

export default Sidebar;
