import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Title, Form, IconWrapper, Input, Button, Divider, StyledLink } from "./style";
import api from "../../services/api";
import { login } from "../../services/auth";
import { FaRegCircleUser } from "react-icons/fa6";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !password) {
      setError("Preencha nome e senha para continuar!");
      return;
    }

    try {
      const response = await api.post("/api/users/login", { name, password });
      login(response.data.accessToken);
      navigate("/app");
    } catch (err) {
      console.error("Erro ao fazer login:", err.response || err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Erro ao fazer login. Verifique suas credenciais.");
      } else {
        setError("Erro ao conectar ao servidor. Tente novamente mais tarde.");
      }
    }
  };

  return (
    <Container>
      <Title>Entrar</Title>
      <Form onSubmit={handleSignIn}>
        <IconWrapper>
          <FaRegCircleUser size={40} color="#fff" />
        </IconWrapper>
        <Input
          type="text"
          placeholder="Nome de Usuário"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit">Entrar</Button>
        {error && <p>{error}</p>}
        <Divider />
        <StyledLink to="/register">Criar conta grátis</StyledLink>
      </Form>
    </Container>
  );
};

export default Login;