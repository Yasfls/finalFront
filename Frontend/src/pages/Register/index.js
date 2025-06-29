import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Title, Form } from "./style";
import api from "../../services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Preencha todos os campos para continuar!");
      return;
    }

    try {
      await api.post("/users/addUser", {
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      setError("Houve um problema ao cadastrar. Tente novamente.");
    }
  };

  return (
    <Container>
      <Title>Criar Conta</Title>
      <Form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Nome de Usuário"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Endereço de Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Form>
    </Container>
  );
};

export default Register;