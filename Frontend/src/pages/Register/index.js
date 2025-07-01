import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Removido: import { Container, Title, Form } from "./style"; // Sem styled components
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
      await api.post("/api/users/addUser", { // ENDPOINT CORRETO
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
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', backgroundColor: '#f0f0f0', paddingLeft: '60px' /* Compensa sidebar */
    }}> {/* Substituído Container */}
        <h1 style={{ fontSize: '2em', marginBottom: '20px' }}>Criar Conta</h1> {/* Substituído Title */}
        <form onSubmit={handleSignUp} style={{
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
                type="email"
                placeholder="Endereço de Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cadastrar</button>
            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </form>
    </div>
  );
};
 
export default Register;