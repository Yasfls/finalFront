import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Removido: import { Container, Title, Form } from "./style"; // Sem styled components
import api from "../../services/api";
import { login } from "../../services/auth";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(""); // Limpa erros anteriores

    if (!name || !password) {
      setError("Preencha nome e senha para continuar!");
      return;
    }

    try {
      const response = await api.post("/api/users/login", { name, password }); // ENDPOINT CORRETO
      login(response.data.accessToken); // Armazena o token recebido do backend
      navigate("/app"); // Redireciona para a página principal/dashboard após login
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
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', backgroundColor: '#f0f0f0', paddingLeft: '60px' /* Compensa sidebar */
    }}> {/* Substituído Container */}
      <h1 style={{ fontSize: '2em', marginBottom: '20px' }}>Entrar</h1> {/* Substituído Title */}
      <form onSubmit={handleSignIn} style={{
        display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px',
        border: '1px solid #ccc', borderRadius: '5px', backgroundColor: 'white', maxWidth: '300px', width: '100%'
      }}> {/* Substituído Form */}
        <input
          type="text"
          placeholder="Nome de Usuário"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Entrar</button>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        <hr style={{ borderTop: '1px solid #eee', margin: '10px 0' }} />
        <Link to="/register" style={{ textAlign: 'center', color: '#007bff', textDecoration: 'none' }}>Criar conta grátis</Link>
      </form>
    </div>
  );
};

export default Login;