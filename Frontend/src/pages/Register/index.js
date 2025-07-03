import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Title, Form, IconWrapper, Input, Button, ErrorMessage, Divider, StyledLink } from "./style";
import api from "../../services/api";
import { FaRegCircleUser } from "react-icons/fa6"; // <-- MODIFICADO: Importar o mesmo ícone do Login

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
      await api.post("/api/users/addUser", {
        name,
        email,
        password,
      });
 
      alert("Cadastro realizado com sucesso! Faça login para continuar.");
      navigate("/login");
    } catch (err) {
      console.error("Erro ao cadastrar:", err.response || err);
      if (err.response && err.response.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Erro ao cadastrar. Tente novamente mais tarde.");
      }
    }
  };
 
  return (
    <Container>
      <Title>Criar Conta</Title>
      <Form onSubmit={handleSignUp}>
        <IconWrapper>
          <FaRegCircleUser size={40} color="#fff" /> {/* <-- MODIFICADO: Usando o mesmo ícone */}
        </IconWrapper>
        <Input
          type="text"
          placeholder="Nome de Usuário"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Endereço de Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Cadastrar</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Divider />
        <StyledLink to="/login">Já tem uma conta? Faça login</StyledLink>
      </Form>
    </Container>
  );
};
 
export default Register;