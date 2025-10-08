import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  /* 🚨 Reset Básico: Remove margens e paddings padrão do navegador */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  /* Garante que o corpo e o elemento raiz ocupem 100% da viewport */
  html, body, #root {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    width: 100%;
    /* Previne a rolagem horizontal inesperada */
    overflow-x: hidden; 
  }
`;
 
export default GlobalStyle;