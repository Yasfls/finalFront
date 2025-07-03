import React from "react";
import { Container, Title, StyledLink } from "./style"; // <-- IMPORTANTE: Importar os componentes estilizados

const App = () => {
return (
// Substituído Container e removido os estilos inline
<Container>
<Title>Tela de Aplicação</Title> {/* Substituído Title */}
{/* conteúdo da página de aplicação */}
<p>Bem-vindo ao dashboard!</p>
<StyledLink to="/logout">Logout</StyledLink> {/* Usando StyledLink */}
</Container>
);
};
export default App;