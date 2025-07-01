import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Removido: import { Container, Title } from "./style"; // Sem styled components
import { logout } from "../../services/auth";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    logout(); // limpa o token
    navigate("/login"); // redireciona para login
  }, [navigate]);
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', backgroundColor: '#f0f0f0', paddingLeft: '60px' /* Compensa sidebar */
    }}> {/* Substituído Container */}
      <h1 style={{ fontSize: '2em' }}>Saindo...</h1> {/* Substituído Title */}
    </div>
  );
};
export default Logout;