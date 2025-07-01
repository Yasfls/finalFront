import React from "react";
// Removido: import { Container, Title } from "./style"; // Sem styled components

const NotFound = () => {
return (
// Substituído Container
<div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', backgroundColor: '#f0f0f0', paddingLeft: '60px' /* Compensa sidebar */
    }}>
<h1 style={{ fontSize: '2.5em', color: 'red' }}>Erro 404: Página Não Encontrada</h1> {/* Substituído Title */}
<p>A página que você está procurando não existe.</p>
</div>
);
};
export default NotFound;