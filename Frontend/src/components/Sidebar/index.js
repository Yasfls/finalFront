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
  AiOutlineSwap, // 💰 Novo Ícone para Transações (Troca)
  AiOutlineTags,
} from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { AiFillDollarCircle } from "react-icons/ai"; // 💰 Ícone para Balanço/Dashboard
 
const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
 
  const isActive = (path) => location.pathname === path;
  const authenticated = isAuthenticated();
 
  const handleLogout = () => {
    // A navegação para /logout lida com a chamada à API e a limpeza local
    navigate("/logout");
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
              {isSidebarOpen && <span>Início</span>}
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
<AiFillDollarCircle size={20} /> {/* Ícone atualizado */}
                  {isSidebarOpen && <span>Balanço</span>}
</StyledLink>
</NavMenuItem>
              {/* ⚠️ REMOVIDO: Rota de Produtos */}
<NavMenuItem $isActive={isActive("/transactions")}> {/* ROTA RENOMEADA */}
<StyledLink to="/transactions" $isOpen={isSidebarOpen}>
<AiOutlineSwap size={20} /> {/* Ícone atualizado */}
                  {isSidebarOpen && <span>Transações</span>}
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