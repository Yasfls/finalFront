import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarContainer, ToggleButton, NavMenu, NavMenuItem, StyledLink, LogoutButton } from "./style";
import { isAuthenticated, logout } from "../../services/auth";
import { useSidebar } from "../../contexts/SidebarContext";
import { AiOutlineLeft } from "react-icons/ai";

import {
  AiOutlineHome,
  AiOutlineDashboard,
  AiOutlineLogout,
  AiOutlineShoppingCart,
  AiOutlineOrderedList,
  AiOutlineTags
} from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <SidebarContainer isOpen={isSidebarOpen}>
<ToggleButton isOpen={isSidebarOpen} onClick={toggleSidebar}>
  <AiOutlineLeft />
</ToggleButton>
      <NavMenu>
        <ul>
          <NavMenuItem $isActive={isActive("/")}>
            <StyledLink to="/" $isOpen={isSidebarOpen}>
              <AiOutlineHome size={20} />
              {isSidebarOpen && <span>Home</span>}
            </StyledLink>
          </NavMenuItem>

          {!authenticated ? (
            <>
              <NavMenuItem $isActive={isActive("/login")}>
                <StyledLink to="/login" $isOpen={isSidebarOpen}>
                  <FaRegCircleUser size={20} />
                  {isSidebarOpen && <span>Login</span>}
                </StyledLink>
              </NavMenuItem>
              <NavMenuItem $isActive={isActive("/register")}>
                <StyledLink to="/register" $isOpen={isSidebarOpen}>
                  <FaRegCircleUser size={20} />
                  {isSidebarOpen && <span>Cadastro</span>}
                </StyledLink>
              </NavMenuItem>
            </>
          ) : (
            <>
              <NavMenuItem $isActive={isActive("/app")}>
                <StyledLink to="/app" $isOpen={isSidebarOpen}>
                  <AiOutlineDashboard size={20} />
                  {isSidebarOpen && <span>Dashboard</span>}
                </StyledLink>
              </NavMenuItem>
              <NavMenuItem $isActive={isActive("/products")}>
                <StyledLink to="/products" $isOpen={isSidebarOpen}>
                  <AiOutlineShoppingCart size={20} />
                  {isSidebarOpen && <span>Produtos</span>}
                </StyledLink>
              </NavMenuItem>
              <NavMenuItem $isActive={isActive("/orders")}>
                <StyledLink to="/orders" $isOpen={isSidebarOpen}>
                  <AiOutlineOrderedList size={20} />
                  {isSidebarOpen && <span>Pedidos</span>}
                </StyledLink>
              </NavMenuItem>
              <NavMenuItem $isActive={isActive("/categories")}>
                <StyledLink to="/categories" $isOpen={isSidebarOpen}>
                  <AiOutlineTags size={20} />
                  {isSidebarOpen && <span>Categorias</span>}
                </StyledLink>
              </NavMenuItem>
              <NavMenuItem>
                <LogoutButton onClick={handleLogout} $isOpen={isSidebarOpen}>
                  <AiOutlineLogout size={20} />
                  {isSidebarOpen && <span>Logout</span>}
                </LogoutButton>
              </NavMenuItem>
            </>
          )}
        </ul>
      </NavMenu>
    </SidebarContainer>
  );
};

export default Sidebar;