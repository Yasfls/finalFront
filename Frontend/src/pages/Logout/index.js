import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Title } from "./style"; // <-- IMPORTANTE: Importar os componentes estilizados
import { logout } from "../../services/auth";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    logout(); // limpa o token
    navigate("/login"); // redireciona para login
  }, [navigate]);
  return (
    <Container> {/* Usando o componente estilizado Container */}
      <Title>Saindo...</Title> {/* Usando o componente estilizado Title */}
    </Container>
  );
};
export default Logout;