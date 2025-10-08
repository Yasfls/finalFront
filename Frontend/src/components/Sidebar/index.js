import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarContainer, ToggleButton, NavMenu, NavMenuItem, StyledLink, LogoutButton } from "./style";
import { isAuthenticated } from "../../services/auth";
import { useSidebar } from "../../contexts/SidebarContext";
import { AiOutlineLeft } from "react-icons/ai";
 
import {
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineSwap,
  AiOutlineTags,
} from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { AiFillDollarCircle } from "react-icons/ai";
 
const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
 
  const isActive = (path) => location.pathname === path;
  const authenticated = isAuthenticated();
 
  const handleLogout = () => {
    navigate("/logout");
  };
 
  return (
<SidebarContainer isOpen={isSidebarOpen}>
<ToggleButton isOpen={isSidebarOpen} onClick={toggleSidebar}>
<AiOutlineLeft />
</ToggleButton>
<NavMenu>
<ul>
          {/* 1. Link para "Início" (Visível sempre) */}
<NavMenuItem $isActive={isActive("/")}>
<StyledLink to="/" $isOpen={isSidebarOpen}>
<AiOutlineHome size={20} />
              {isSidebarOpen && <span>Início</span>}
</StyledLink>
</NavMenuItem>
 
          {/* 2. Opções visíveis SOMENTE PARA QUEM NÃO ESTÁ LOGADO */}
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
            /* 3. Opções visíveis SOMENTE PARA QUEM ESTÁ LOGADO */
<>
<NavMenuItem $isActive={isActive("/app")}>
<StyledLink to="/app" $isOpen={isSidebarOpen}>
<AiFillDollarCircle size={20} /> 
                  {isSidebarOpen && <span>Balanço</span>}
</StyledLink>
</NavMenuItem>
<NavMenuItem $isActive={isActive("/transactions")}>
<StyledLink to="/transactions" $isOpen={isSidebarOpen}>
<AiOutlineSwap size={20} /> 
                  {isSidebarOpen && <span>Transações</span>}
</StyledLink>
</NavMenuItem>
<NavMenuItem $isActive={isActive("/categories")}>
<StyledLink to="/categories" $isOpen={isSidebarOpen}>
<AiOutlineTags size={20} />
                  {isSidebarOpen && <span>Categorias</span>}
</StyledLink>
</NavMenuItem>
              {/* Botão de Logout */}
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