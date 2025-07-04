import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  /* Aplicando o gradiente verde da nova paleta */
  background: linear-gradient(135deg, rgb(225, 236, 219) 0%, #E4EFE7 100%);
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
  padding: 8px 18px; /* Padding ajustado */
  background-color: #99BC85; /* Cor verde principal da nova paleta */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 10px rgba(122, 146, 107, 0.3); /* Sombra com tom verde */
  margin-bottom: 20px;
  width: fit-content;
  align-self: flex-start; /* Alinha à esquerda */

  &:hover {
    background-color: rgb(120, 138, 110); /* Verde mais escuro no hover */
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
  }
`;

// Componente que será a "caixa de vidro" para a tabela
export const TableContainer = styled.div`
  background: rgba(255, 255, 255, 0.2); /* Fundo transparente para o efeito de vidro */
  border: 1px solid rgba(255, 255, 255, 0.3); /* Borda sutil */
  border-radius: 15px; /* Bordas arredondadas */
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1); /* Sombra difusa */
  backdrop-filter: blur(10px); /* Efeito de desfoque de vidro */
  -webkit-backdrop-filter: blur(10px);
  overflow: hidden; /* Esconde o conteúdo que ultrapassar o rounded border */
  margin-bottom: 20px; /* Espaço abaixo da tabela */
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: transparent; /* A tabela em si será transparente */
  table-layout: fixed; /* Fixa o layout da tabela */
`;

export const TableHeader = styled.thead`
  background-color: rgba(153, 188, 133, 0.8); /* Cabeçalho em tom de verde transparente */
  th {
    padding: 15px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    text-align: left;
    color: #333;
    font-weight: bold;
    /* Ajustando as larguras das colunas para Pedidos */
    &:nth-child(1) { width: 15%; } /* ID do Pedido */
    &:nth-child(2) { width: 15%; } /* ID do Usuário */
    &:nth-child(3) { width: 25%; } /* Data/Hora Criação */
    &:nth-child(4) { width: 15%; } /* Status */
    &:nth-child(5) { width: 30%; } /* Ações */
  }
`;

// Componente para o corpo da tabela com rolagem
export const ScrollableTableBody = styled.tbody`
  display: block; /* Permite controlar a altura com max-height */
  max-height: 400px; /* Altura máxima para a rolagem */
  overflow-y: auto; /* Adiciona rolagem vertical quando o conteúdo excede a altura */
  width: 100%;

  /* Esconde a barra de rolagem para alguns navegadores */
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  & {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  tr {
    display: table; /* Para fazer as TRs se ajustarem ao display:block do tbody */
    width: 100%;
    table-layout: fixed; /* Para que as colunas tenham larguras fixas */
    border-bottom: 1px solid rgba(228, 239, 231, 0.8); /* Linhas divisórias sutis */
    &:last-child td {
      border-bottom: none; /* Remove a última borda inferior */
    }
    &:hover {
      background-color: rgba(245, 249, 247, 0.8);
    }
  }
  td {
    padding: 15px;
    border: 1px solid rgba(228, 239, 231, 0.4); /* Bordas mais suaves */
    color: #555;
    vertical-align: top;
    /* Larguras das colunas do corpo, devem corresponder às do cabeçalho */
    &:nth-child(1) { width: 15%; }
    &:nth-child(2) { width: 15%; }
    &:nth-child(3) { width: 25%; }
    &:nth-child(4) { width: 15%; }
    &:nth-child(5) { width: 30%; }
  }
`;

export const ActionButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
`;

export const ActionButton = styled.button`
  padding: 5px 10px; /* Padding reduzido e correto */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.85em;
  transition: background-color 0.3s ease, transform 0.2s ease;
  color: white;
  width: 120px; /* Largura fixa para alinhamento */
  text-align: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);

  ${props => props.$isView && `
    background-color: #6C757D; /* Cinza para Visualizar (neutro) */
    &:hover { background-color: #5A6268; transform: translateY(-1px); }
  `}
  ${props => props.$isPrepare && `
    background-color: #F8D066; /* Amarelo suave (para "Em Preparo") */
    color: #333; /* Texto escuro para contraste */
    &:hover { background-color: #E8B446; transform: translateY(-1px); }
  `}
  ${props => props.$isReady && `
    background-color: #99BC85; /* Verde suave (para "Pronto") */
    &:hover { background-color: #88A578; transform: translateY(-1px); }
  `}
  ${props => props.$isDeliver && `
    background-color: #4CAF50; /* Verde mais forte (para "Entregue") */
    &:hover { background-color: #45A049; transform: translateY(-1px); }
  `}
  ${props => props.$isDelete && `
    background-color: #DC3545; /* Vermelho padrão para Excluir */
    &:hover { background-color: #C82333; transform: translateY(-1px); }
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
  max-width: 600px; /* Aumentado um pouco para modais de Pedidos */
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

  h3 { /* Para "Produtos do Pedido" */
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

  /* Refatorando .product-item e .products-list para serem componentes */
  
  .button-group {
    display: flex;
    justify-content: flex-end; /* Alinha botões à direita (padrão dos modais) */
    gap: 10px;
    margin-top: 20px;
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
    border-color: #99BC85; /* Borda da nova paleta ao focar */
    box-shadow: 0 0 0 2px rgba(153, 188, 133, 0.3);
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
    border-color: #99BC85; /* Borda da nova paleta ao focar */
    box-shadow: 0 0 0 2px rgba(153, 188, 133, 0.3);
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
    background-color: #99BC85; /* Verde principal da nova paleta */
    &:hover {
      background-color: #88A578;
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
      transform: translateY(0);
    }
    &:active {
      transform: translateY(0);
    }
  }
`;

export const ErrorMessage = styled.p`
  color: #DC3545; /* Vermelho para erro */
  background-color: #F8D066; /* Fundo amarelo para erro (mais suave) */
  border: 1px solid #DC3545;
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
    border-color: #99BC85; /* Nova paleta ao focar */
    box-shadow: 0 0 0 2px rgba(153, 188, 133, 0.3);
  }
`;

// NOVO: Styled Components para os itens de produto dentro dos modais
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