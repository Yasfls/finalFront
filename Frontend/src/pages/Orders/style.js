import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  /* NOVO: Fundo muito sutil, quase branco, para imitar a tela de Categorias */
  background: linear-gradient(135deg, #f8f8f8 0%, #eef3f0 100%); /* Um branco com leve toque de verde/cinza */
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
`;

export const Title = styled.h1`
  color: #333;
  font-size: 2.2em;
  margin-bottom: 25px;
  text-align: center;
`;

export const PrimaryButton = styled.button`
  padding: 10px 20px;
  /* NOVO: Verde vibrante igual ao botão de Categorias */
  background-color: #32CD32; /* Um verde vibrante (LimeGreen) */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.05em;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  /* NOVO: Sombra na mesma tonalidade do novo verde */
  box-shadow: 0 4px 10px rgba(50, 205, 50, 0.4);
  margin-bottom: 20px;
  width: fit-content;

  &:hover {
    background-color: #28a745; /* Um verde um pouco mais escuro no hover */
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
  }
`;

export const TableContainer = styled.div`
  background: #FFFFFF;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: auto;
  margin-bottom: 20px;
  max-height: 500px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: transparent; /* A tabela em si deve ser transparente para mostrar o fundo branco do TableContainer */
  table-layout: fixed;
`;

export const TableHeader = styled.thead`
  background-color: #FFFFFF; /* NOVO: Fundo branco, igual ao corpo da tabela */
  th {
    padding: 15px 10px;
    border: none; /* NOVO: Removido bordas de depuração e bordas laterais */
    border-bottom: 1px solid #e0e0e0; /* NOVO: Borda inferior sutil */
    text-align: left;
    color: #333;
    font-weight: bold;
    
    &:nth-child(1) { width: 8%; text-align: center; }
    &:nth-child(2) { width: 12%; }
    &:nth-child(3) { width: 15%; }
    &:nth-child(4) { width: 20%; text-align: center; }
    &:nth-child(5) { width: 15%; text-align: center; }
    &:nth-child(6) { width: 30%; text-align: center; }
  }
`;

export const ScrollableTableBody = styled.tbody`

  tr {
    display: table;
    width: 100%;
    table-layout: fixed;
    border-bottom: 1px solid #f0f0f0; /* NOVO: Borda inferior muito sutil para separar as linhas */
    &:last-child {
      border-bottom: none;
    }
    &:hover {
      background-color: #f9f9f9; /* NOVO: Fundo um pouco mais claro no hover */
    }
  }
  td {
    padding: 12px 10px;
    border: 1px solid #777; /* Deixe as bordas de depuração por enquanto */
    color: #555;
    vertical-align: middle;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: table-cell !important;
    
    &:nth-child(1) { width: 8%; text-align: center; }
    &:nth-child(2) { width: 12%; }
    &:nth-child(3) { width: 15%; }
    &:nth-child(4) { width: 20%; text-align: center; }
    &:nth-child(5) { width: 15%; text-align: center; }
    &:nth-child(6) { width: 30%; text-align: center; }
  }
`;
  
export const ActionButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row; /* NOVO: Botões lado a lado como nas categorias */
  flex-wrap: wrap; /* Permite quebrar linha se não houver espaço suficiente */
  gap: 8px; /* Espaço entre os botões */
  align-items: center;
  justify-content: center; /* Centralizar os botões dentro da célula */
  height: 100%;
`;
  
export const ActionButton = styled.button`
  padding: 6px 8px; /* Padding ajustado para botões menores/links */
  background-color: transparent; /* NOVO: Fundo transparente */
  border: none; /* NOVO: Sem borda */
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.85em; /* Ligeiramente maior que antes, para legibilidade de links */
  transition: color 0.3s ease, transform 0.2s ease; /* Transição para cor, não background */
  box-shadow: none; /* NOVO: Sem sombra */
  width: fit-content; /* NOVO: Largura se ajusta ao conteúdo */
  white-space: nowrap; /* Evita quebra de linha do texto do botão */
  
  /* Cores dos botões de ação na tabela, adaptadas ao estilo de categorias */
  ${props => props.$isView && `
    color: #32CD32; /* Verde vibrante para Visualizar/Editar */
    &:hover { color: #28a745; transform: translateY(-1px); }
  `}
  ${props => props.$isPrepare && `
    color: #007bff; /* Azul para "Em Preparo" (consistente com um status) */
    &:hover { color: #0056b3; transform: translateY(-1px); }
  `}
  ${props => props.$isReady && `
    color: #ffc107; /* Amarelo/Laranja para "Pronto" */
    &:hover { color: #e0a800; transform: translateY(-1px); }
  `}
  ${props => props.$isDeliver && `
    color: #6f42c1; /* Roxo para "Entregue" (consistente com um status final) */
    &:hover { color: #563d7c; transform: translateY(-1px); }
  `}
  ${props => props.$isDelete && `
    color: #dc3545; /* Vermelho padrão para Excluir */
    &:hover { color: #bd2130; transform: translateY(-1px); }
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
  background: rgba(255, 255, 255, 0.95);
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

  p {
    color: #ff3333; /* Cor do texto de erro */
    background-color: #ffe5e5; /* Fundo de erro (rosa claro) */
    border: 1px solid #ff3333; /* Borda de erro */
    padding: 10px;
    border-radius: 5px;
    text-align: center;
  }

  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  }
`;
  
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
    border-color: #32CD32; /* NOVO: Verde vibrante no foco */
    box-shadow: 0 0 0 2px rgba(50, 205, 50, 0.3); /* NOVO: Sombra verde no foco */
  }
`;
  
export const Select = styled.select`
  height: 48px;
  padding: 0 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1em;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:focus {
    outline: none;
    border-color: #32CD32; /* NOVO: Verde vibrante no foco */
    box-shadow: 0 0 0 2px rgba(50, 205, 50, 0.3); /* NOVO: Sombra verde no foco */
  }
`;
  
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
    background-color: #32CD32; /* NOVO: Verde vibrante principal */
    &:hover {
      background-color: #28a745;
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
  
export const TextArea = styled.textarea`
  padding: 8px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1em;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #32CD32; /* NOVO: Verde vibrante no foco */
    box-shadow: 0 0 0 2px rgba(50, 205, 50, 0.3); /* NOVO: Sombra verde no foco */
  }
`;

// Componentes para itens de produto dentro dos modais (mantidos com as atualizações de foco de Input/Select/Button)
export const ProductItemWrapper = styled.div`
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
`;

export const ProductsListContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  background: #f9f9f9;
`;

export const ProductListItemLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  font-size: 1em;
  color: #333;
  input[type="checkbox"] {
    margin-right: 8px;
    transform: scale(1.2);
  }
`;

export const ProductListItemInputGroup = styled.div`
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;