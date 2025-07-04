import styled from "styled-components";
import { Link } from "react-router-dom"; // Importar Link para estilizar
 
export const SidebarContainer = styled.div`
  height: 100vh;
  background-color:rgb(73, 82, 75);
  transition: width 0.3s ease-in-out;
  width: ${(props) => (props.isOpen ? "200px" : "60px")};
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100; /* Garante que fique acima do conteúdo */
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3); /* Sombra suave */
  overflow-x: hidden; /* Esconde o conteúdo extra quando fechado */
  padding-top: 10px; /* Espaço no topo */
`;
 
export const ToggleButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background: #99BC85;
  color: white;
  position: absolute;
  right: -20px; /* Metade para fora */
  top: 20px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 101; /* Acima da sidebar */
  box-shadow: 0 2px 5px rgba(122, 146, 107, 0.4);
  transition: background-color 0.3s ease, transform 0.2s ease;
 
  &:hover {
    background-color: rgb(120, 138, 110);
    transform: scale(1.1);
  }
&:active {
    transform: scale(1.0);
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
 
export const NavMenuItem = styled.li` /* NOVO: Componente para cada item da lista */
  margin: 5px 0;
  /* Estilo para o item ativo */
  background-color: ${(props) => (props.$isActive ? "rgba(225, 236, 219)" : "transparent")}; /* Rosa suave transparente para ativo */
  border-left: ${(props) => (props.$isActive ? "4px solid #99BC85" : "4px solid transparent")}; /* Borda rosa para ativo */
  transition: background-color 0.3s ease, border-left 0.3s ease;
 
  &:hover {
    background-color: rgba(255, 105, 180, 0.1); /* Hover suave */
  }
`;
 
export const StyledLink = styled(Link)` /* NOVO: Componente para os links */
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 15px; /* Mais espaço entre ícone e texto */
  transition: background-color 0.3s, color 0.3s;
  overflow: hidden; /* Garante que o texto não "escape" ao esconder */
 
  svg { /* Estilo para os ícones */
    flex-shrink: 0; /* Garante que o ícone não encolha */
  }
 
  span {
    white-space: nowrap;
    opacity: ${(props) => (props.$isOpen ? 1 : 0)}; /* Usar prop para controlar opacidade */
    transition: opacity 0.3s ease;
    font-size: 1.05em; /* Fonte ligeiramente maior */
  }
`;
 
export const LogoutButton = styled.button` /* NOVO: Componente para o botão de Logout */
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
    background-color: rgba(255, 105, 180, 0.1); /* Hover suave */
  }
 
  span {
    white-space: nowrap;
    opacity: ${(props) => (props.$isOpen ? 1 : 0)};
    transition: opacity 0.3s ease;
  }
`;