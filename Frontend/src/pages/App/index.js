import React from "react";
import { Link } from "react-router-dom";
// Removido: import { Container, Title } from "./style"; // Sem styled components

const App = () => {
return (
// Substituído Container
<div style={{ paddingLeft: '80px', paddingTop: '20px' }}> {/* Ajuste simples para compensar a sidebar */}
<h1 style={{ fontSize: '2em', marginBottom: '20px' }}>Tela de Aplicação</h1> {/* Substituído Title */}
{/* conteúdo da página de aplicação */}
<p>Bem-vindo ao dashboard da sua aplicação!</p>
<Link to="/logout">Logout</Link>
</div>
);
};
export default App;