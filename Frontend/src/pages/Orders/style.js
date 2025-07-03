import styled from "styled-components";
// Importações de Link não são necessárias aqui, mas são comuns para StyledLink
// import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); /* Fundo gradiente rosa/roxo suave */
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333; /* Cor do texto padrão */
`;

export const Title = styled.h1`
  color: #333;
  font-size: 2.2em;
  margin-bottom: 25px;
  text-align: center;
`;

export const PrimaryButton = styled.button`
  padding: 12px 25px;
  background-color: #ff69b4; /* Rosa vibrante */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 10px rgba(255, 105, 180, 0.3);
  margin-bottom: 20px;

  &:hover {
    background-color: #e85a9f;
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.7); /* Fundo transparente para o efeito de vidro */
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
`;

export const TableHeader = styled.thead`
  background-color: rgba(255, 255, 255, 0.9);
  th {
    padding: 15px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    text-align: left;
    color: #333;
    font-weight: bold;
  }
`;

export const TableBody = styled.tbody`
  tr {
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    &:last-child {
      border-bottom: none;
    }
    &:hover {
      background-color: rgba(255, 255, 255, 0.8);
    }
  }
  td {
    padding: 15px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    color: #555;
    vertical-align: top; /* Garante que o conteúdo fique no topo da célula */
  }
`;

export const ActionButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column; /* Coloca um embaixo do outro */
  gap: 5px; /* Espaçamento entre eles */
  align-items: flex-start; /* Alinha à esquerda na célula */
`;

export const ActionButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.3s ease, transform 0.2s ease;
  color: white;
  width: 120px; /* Largura fixa para manter alinhamento vertical mais limpo */
  text-align: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);

  ${props => props.$isView && `
    background-color: #17a2b8; /* Azul para Visualizar */
    &:hover { background-color: #138496; transform: translateY(-1px); }
  `}
  ${props => props.$isPrepare && `
    background-color: #ffc107; /* Amarelo para Em Preparo */
    &:hover { background-color: #e0a800; transform: translateY(-1px); }
  `}
  ${props => props.$isReady && `
    background-color: #28a745; /* Verde para Pronto */
    &:hover { background-color: #218838; transform: translateY(-1px); }
  `}
  ${props => props.$isDeliver && `
    background-color: #6c757d; /* Cinza para Entregue */
    &:hover { background-color: #5a6268; transform: translateY(-1px); }
  `}
  ${props => props.$isDelete && `
    background-color: #dc3545; /* Vermelho para Excluir */
    &:hover { background-color: #c82333; transform: translateY(-1px); }
  `}
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
`;

export const ModalContent = styled.div`
  background: rgba(255, 255, 255, 0.95); /* Quase opaco para o conteúdo do modal */
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 600px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;

  h2 {
    color: #333;
    font-size: 1.8em;
    margin-bottom: 15px;
    text-align: center;
  }

  h3 {
    color: #555;
    font-size: 1.4em;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  p { /* Mensagens de erro ou texto normal */
    color: #ff3333;
    background-color: #ffe5e5;
    border: 1px solid #ff3333;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
  }

  .product-item { /* Estilo para cada item de produto dentro dos modais */
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 8px;
    padding: 10px 15px;
    margin-bottom: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    p {
      color: #333;
      margin: 0;
      background: none;
      border: none;
      padding: 0;
      text-align: left;
    }
  }

  .button-group {
    display: flex;
    justify-content: flex-end; /* Alinha botões à direita */
    gap: 10px;
    margin-top: 20px;
  }

  .products-list { /* Estilo para a lista de produtos no ProductSelectionModal */
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 4px;
    background: #f9f9f9;
  }

  .products-list label {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    font-size: 1em;
    color: #333;
  }

  .products-list input[type="checkbox"] {
    margin-right: 8px;
    transform: scale(1.2); /* Aumenta o checkbox */
  }

  .products-list input[type="number"],
  .products-list textarea {
    padding: 6px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: calc(100% - 16px); /* Ajusta a largura */
    margin-top: 5px;
  }
`;

// Componente Input reutilizável
export const Input = styled.input`
  height: 48px;
  padding: 0 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1em;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);

  &:focus {
    outline: none;
    border-color: #ff69b4;
    box-shadow: 0 0 0 2px rgba(255, 105, 180, 0.3);
  }
`;

// Componente Button reutilizável
export const Button = styled.button`
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  color: white;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);

  &.primary-action {
    background-color: #ff69b4; /* Rosa principal */
    &:hover {
      background-color: #e85a9f;
      transform: translateY(-2px);
    }
    &:active {
      transform: translateY(0);
    }
  }
  
  &.secondary-action {
    background-color: #6c757d; /* Cinza */
    &:hover {
      background-color: #5a6268;
      transform: translateY(-2px);
    }
    &:active {
      transform: translateY(0);
    }
  }
`;

export const ErrorMessage = styled.p`
  color: #ff3333;
  background-color: #ffe5e5;
  border: 1px solid #ff3333;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  margin-top: 15px;
`;