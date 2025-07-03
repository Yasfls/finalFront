import styled from "styled-components";
import { Link } from 'react-router-dom'; // Importar Link para StyledLink

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 2rem; Ajustado para padding-left em Routes ou um div global, e padding-top aqui */
  padding-top: 20px; /* Padding no topo para conteúdo */
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); /* Fundo gradiente rosa/roxo suave */
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center; /* Centraliza o texto */
  color: #333; /* Cor do texto padrão */
`;

export const Title = styled.h2`
  color: #333;
  font-size: 2.2rem;
  margin-bottom: 20px; /* Espaçamento abaixo do título */
`;

export const StyledLink = styled(Link)`
  font-size: 15px;
  color: #ff69b4; /* Links em rosa */
  text-decoration: none;
  margin-top: 20px; /* Espaçamento acima do link */
  transition: color 0.2s;
  &:hover {
    color: #e85a9f;
    text-decoration: underline;
  }
`;