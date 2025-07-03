import React from "react";
import { Container, Title } from "./style"; // <-- IMPORTANTE: Importar os componentes estilizados

const NotFound = () => {
return (
// Substituído Container e removido os estilos inline
<Container>
<Title>Erro 404: Página Não Encontrada</Title> {/* Substituído Title */}
<p>A página que você está procurando não existe.</p>
</Container>
);
};
export default NotFound;