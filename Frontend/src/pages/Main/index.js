import React from "react";
import { Container, Title } from "./style"; // <-- IMPORTANTE: Importar os componentes estilizados

const Main = () => {
return (
// Substituído Container e removido o paddingLeft, que agora deve vir do Routes.js (div com marginLeft)
<Container>
<Title>Página Inicial</Title> {/* Substituído Title */}
<p>Bem-vindo à página inicial!</p>
</Container>
);
};
export default Main;