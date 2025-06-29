import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Title, Form } from "./style";
import api from "../../services/api";
import { login } from "../../services/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !senha) {
      setError("Preencha email e senha para continuar!");
      return;
    }
    try {
      const response = await api.post("/signin", { email, senha });
      console.log(response.data.accessToken);
      login(response.data.accessToken);
      navigate("/app");
    } catch (err) {
      setError("Houve um problema com o login, verifique suas credenciais!!");
    }
  };
  return (
    <Container>
      <Title>Tela de Login</Title>
      <Form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Endereço de Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit">Entrar</button>
        {error && <p>{error}</p>}
        <Link to="/register">Criar conta</Link>
      </Form>
    </Container>
  );
};
export default Login;
