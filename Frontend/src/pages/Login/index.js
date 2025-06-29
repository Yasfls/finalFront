import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Title, Form } from "./style";
import api from "../../services/api";
import { login } from "../../services/auth";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!name || !password) {
      setError("Preencha o nome e a senha para continuar!");
      return;
    }

    try {
      const response = await api.post("/users/login", { name, password });

      const token = response.data.accessToken;
      login(token);
      navigate("/app");
    } catch (err) {
      setError("Houve um problema com o login. Verifique suas credenciais!");
    }
  };

  return (
    <Container>
      <Title>Tela de Login</Title>
      <Form onSubmit={handleSignIn}>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Link to="/register">Criar conta</Link>
      </Form>
    </Container>
  );
};

export default Login;
