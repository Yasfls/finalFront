import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Removido: import { SidebarContainer, ToggleButton, NavMenu } from "./style"; // Sem styled components
import { isAuthenticated, logout } from "../../services/auth";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineDashboard,
  AiOutlineLogout,
  AiOutlineShoppingCart,
  AiOutlineOrderedList,
  AiOutlineTags // <-- NOVO: Importar ícone para categorias
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
    // Substituído SidebarContainer
    <div style={{
      width: isOpen ? '200px' : '60px',
      height: '100vh',
      backgroundColor: '#282c34',
      color: 'white',
      position: 'fixed',
      transition: 'width 0.3s ease-in-out',
      overflowX: 'hidden',
      zIndex: 100 // Garante que fique acima do conteúdo
    }}>
      {/* Substituído ToggleButton */}
      <button onClick={toggleSidebar} style={{
        background: 'none',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        padding: '10px',
        width: '100%',
        textAlign: 'right'
      }}>
        {isOpen ? "←" : "→"}
      </button>
      {/* Substituído NavMenu */}
      <nav style={{ paddingTop: '20px' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{
            padding: '10px 0',
            backgroundColor: isActive("/") ? '#61dafb' : 'transparent',
            color: isActive("/") ? '#282c34' : 'white'
          }}>
            <Link to="/" style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              padding: '0 10px'
            }}>
              <AiOutlineHome size={20} style={{ marginRight: isOpen ? '10px' : '0' }} />
              {isOpen && <span>Home</span>}
            </Link>
          </li>

          {!authenticated ? (
            <>
              <li style={{
                padding: '10px 0',
                backgroundColor: isActive("/login") ? '#61dafb' : 'transparent',
                color: isActive("/login") ? '#282c34' : 'white'
              }}>
                <Link to="/login" style={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  padding: '0 10px'
                }}>
                  <AiOutlineLogin size={20} style={{ marginRight: isOpen ? '10px' : '0' }} />
                  {isOpen && <span>Login</span>}
                </Link>
              </li>
              <li style={{
                padding: '10px 0',
                backgroundColor: isActive("/register") ? '#61dafb' : 'transparent',
                color: isActive("/register") ? '#282c34' : 'white'
              }}>
                <Link to="/register" style={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  padding: '0 10px'
                }}>
                  <AiOutlineUserAdd size={20} style={{ marginRight: isOpen ? '10px' : '0' }} />
                  {isOpen && <span>Register</span>}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li style={{
                padding: '10px 0',
                backgroundColor: isActive("/app") ? '#61dafb' : 'transparent',
                color: isActive("/app") ? '#282c34' : 'white'
              }}>
                <Link to="/app" style={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  padding: '0 10px'
                }}>
                  <AiOutlineDashboard size={20} style={{ marginRight: isOpen ? '10px' : '0' }} />
                  {isOpen && <span>Dashboard</span>}
                </Link>
              </li>
              <li style={{
                padding: '10px 0',
                backgroundColor: isActive("/products") ? '#61dafb' : 'transparent',
                color: isActive("/products") ? '#282c34' : 'white'
              }}>
                <Link to="/products" style={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  padding: '0 10px'
                }}>
                  <AiOutlineShoppingCart size={20} style={{ marginRight: isOpen ? '10px' : '0' }} />
                  {isOpen && <span>Produtos</span>}
                </Link>
              </li>
              <li style={{
                padding: '10px 0',
                backgroundColor: isActive("/orders") ? '#61dafb' : 'transparent',
                color: isActive("/orders") ? '#282c34' : 'white'
              }}>
                <Link to="/orders" style={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  padding: '0 10px'
                }}>
                  <AiOutlineOrderedList size={20} style={{ marginRight: isOpen ? '10px' : '0' }} />
                  {isOpen && <span>Pedidos</span>}
                </Link>
              </li>
              {/* NOVO: Link para Categorias */}
              <li style={{
                padding: '10px 0',
                backgroundColor: isActive("/categories") ? '#61dafb' : 'transparent',
                color: isActive("/categories") ? '#282c34' : 'white'
              }}>
                <Link to="/categories" style={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  padding: '0 10px'
                }}>
                  <AiOutlineTags size={20} style={{ marginRight: isOpen ? '10px' : '0' }} />
                  {isOpen && <span>Categorias</span>}
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  style={{
                    background: "none",
                    border: "none",
                    color: 'white',
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1rem",
                    padding: '10px'
                  }}
                >
                  <AiOutlineLogout size={20} style={{ marginRight: isOpen ? '10px' : '0' }} />
                  {isOpen && <span>Logout</span>}
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;