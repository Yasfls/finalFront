import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Title, Form } from "./style";
import api from "../../services/api";
const Register = () => {
const [email, setEmail] = useState("");
const [senha, setSenha] = useState("");
const [tipo, setTipo] = useState("");
const [error, setError] = useState("");
const navigate = useNavigate();
const handleSignUp = async (e) => {
e.preventDefault();
if (!email || !senha || !tipo) {
setError("Preencha email, senha e tipo para continuar!");
return;
}
try {
await api.post("/signup", { email, senha, tipo });
navigate("/login");
} catch (err) {
setError("Houve um problema ao cadastrar. Tente novamente.");
}
};
return (
<Container>
<Title>Criar Conta</Title>
<Form onSubmit={handleSignUp}>
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
<input
type="number"
placeholder="Tipo"
onChange={(e) => setTipo(e.target.value)}
/>
<button type="submit">Cadastrar</button>
{error && <p>{error}</p>}
</Form>
</Container>
);
};
export default Register;