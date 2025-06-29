import React from "react";
import { Link } from "react-router-dom";
import { Container, Title } from "./style";
const App = () => {
return (
<Container>
<Title>Tela de Aplicação</Title>
{/* conteúdo da página de aplicação */}
<Link to="/logout">Logout</Link>
</Container>
);
};
export default App;
