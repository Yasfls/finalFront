import styled from "styled-components";
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px; /* Padding no topo para conteúdo */
  background: linear-gradient(135deg,rgb(225, 236, 219) 0%, #E4EFE7 100%);
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  color: #333;
`;

export const Title = styled.h2`
  color: #333;
  font-size: 2.2rem;
  margin-bottom: 20px;
`;

export const StyledLink = styled(Link)`
  font-size: 15px;
  color:rgb(142, 155, 145);
  text-decoration: none;
  margin-top: 5px;
  transition: color 0.2s;
  &:hover {
    color:rgb(92, 100, 94);
    text-decoration: underline;
  }
`;