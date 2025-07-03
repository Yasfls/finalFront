import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 2rem; Ajustado para padding-left em Routes ou um div global, e padding-top aqui */
  padding-top: 20px; /* Padding no topo para conteúdo */
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); /* Fundo gradiente rosa/roxo suave */
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center; /* Centraliza o texto */
`;

export const Title = styled.h2`
  color: #333;
  font-size: 2.2rem;
  margin-bottom: 20px; /* Espaçamento abaixo do título */
`;