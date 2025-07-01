import React from "react";
// Removido: import { Container, Title } from "./style"; // Sem styled components

const Main = () => {
return (
// Substituído Container
<div style={{ paddingLeft: '80px', paddingTop: '20px' }}> {/* Ajuste simples para compensar a sidebar */}
<h1 style={{ fontSize: '2em', marginBottom: '20px' }}>Página Inicial</h1> {/* Substituído Title */}
<p>Bem-vindo à página principal do seu projeto React!</p>
</div>
);
};
export default Main;