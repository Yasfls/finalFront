import React from "react";
import { Container, Title } from "./style";

const NotFound = () => {
  return (
    <Container>
      <Title>Erro 404: Página Não Encontrada</Title>
      <p>A página que você está procurando não existe.</p>
    </Container>
  );
};
export default NotFound;