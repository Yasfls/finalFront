import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Title } from "./style";
import { logout } from "../../services/auth";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    logout();
    navigate("/login");
  }, [navigate]);
  return (
    <Container>
      <Title>Saindo...</Title>
    </Container>
  );
};
export default Logout;