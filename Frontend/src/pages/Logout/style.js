import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centraliza verticalmente */
  align-items: center; /* Centraliza horizontalmente */
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); /* Fundo gradiente rosa/roxo suave */
  padding: 2rem;
  text-align: center;
`;

export const Title = styled.h2`
  color: #333;
  font-size: 2.2rem;
  margin-bottom: 1rem;
`;