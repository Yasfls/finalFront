import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Title } from "./style";
import { logout } from "../../services/auth";
import api from "../../services/api"; // Adicionado

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const performLogout = async () => {
        try {
            await api.post("/api/users/logout"); // NOVA CHAMADA para limpar o HttpOnly cookie no backend
        } catch (error) {
            console.error("Erro ao fazer logout no backend:", error);
        } finally {
            logout(); // Limpa o marcador local
            navigate("/login");
        }
    };
    performLogout();
  }, [navigate]);
  return (
    <Container>
      <Title>Saindo...</Title>
    </Container>
  );
};
export default Logout;