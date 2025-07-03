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
  text-align: center; /* Centraliza o texto */
  color: #333; /* Cor do texto padrão */
`;

export const Title = styled.h2`
  color:rgb(201, 66, 122); /* Vermelho mais forte para o erro */
  font-size: 2.5rem; /* Fonte maior para destacar */
  margin-bottom: 1rem;
`;