import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  /* Fundo gradiente verde/marfim (como em Produtos e Pedidos) */
  background: linear-gradient(135deg,rgb(225, 236, 219) 0%, #E4EFE7 100%);
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
  padding: 8px 18px;
  background-color: #9fb981; /* <-- NOVO: Verde mais escuro para o botão principal */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 10px #9fb981(107, 142, 35, 0.4); /* <-- NOVO: Sombra em tom verde */
  margin-bottom: 20px;
  width: fit-content;
  align-self: flex-start; /* Alinha à esquerda, como o botão de Pedidos */

  &:hover {
    background-color: #79896a; /* <-- NOVO: Verde ainda mais escuro no hover */
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
  }
`;

export const TableContainer = styled.div`
  background: rgba(255, 255, 255, 0.2); /* Fundo transparente para o efeito de vidro */
  border: 1px solid rgba(255, 255, 255, 0.3); /* Borda sutil */
  border-radius: 15px; /* IMPORTANTE: Aplica os cantos arredondados na caixa externa */
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  overflow: hidden; /* IMPORTANTE: Garante que o conteúdo interno (incluindo o TableHeader) seja cortado pelos cantos arredondados do contêiner */
  margin-bottom: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: transparent; /* A tabela em si será transparente */
  table-layout: fixed; /* Garante larguras de coluna fixas */
`;

export const TableHeader = styled.thead`
  background-color: rgba(255, 255, 255, 0.8); /* Fundo BRANCO semi-transparente (como em Produtos) */
  th {
    padding: 15px;
    border: 1px solid rgba(255, 255, 255, 0.5); /* Borda como em Produtos */
    text-align: left;
    color: #333;
    font-weight: bold;
    /* Larguras das colunas ESPECÍFICAS para Categorias */
    &:nth-child(1) { width: 15%; } /* ID */
    &:nth-child(2) { width: 45%; } /* Nome */
    &:nth-child(3) { width: 40%; } /* Ações */
  }
`;

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
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  
  tr {
    display: table; /* Para fazer as TRs se ajustarem ao display:block do tbody */
    width: 100%;
    table-layout: fixed; /* Para que as colunas tenham larguras fixas */
    border-bottom: 1px solid rgba(255, 255, 255, 0.4); /* Borda como em Produtos */
    &:last-child {
      border-bottom: none;
    }
    &:hover {
      background-color: rgba(255, 255, 255, 0.8); /* Fundo branco no hover (como Produtos) */
    }
  }
  td {
    padding: 15px;
    border: 1px solid rgba(255, 255, 255, 0.4); /* Borda como em Produtos */
    color: #555;
    vertical-align: top;
    /* Larguras das colunas do corpo ESPECÍFICAS para Categorias */
    &:nth-child(1) { width: 15%; } /* ID */
    &:nth-child(2) { width: 45%; } /* Nome */
    &:nth-child(3) { width: 40%; } /* Ações */
  }
`;
 
export const ActionButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column; /* Coloca um embaixo do outro */
  gap: 5px; /* Espaçamento entre eles */
  align-items: flex-start;
`;
 
export const ActionButton = styled.button`
  padding: 5px 10px; /* Ajustado para ser consistente */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.85em; /* Ajustado para ser consistente */
  transition: background-color 0.3s ease, transform 0.2s ease;
  color: white;
  width: 90px; /* Largura fixa para alinhamento */
  text-align: center; /* Centraliza o texto dentro do botão */
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);

  ${props => props.$isEdit && `
    background-color: #ff8c69; /* Laranja Rosado para Editar (como em Produtos) */
    &:hover {
      background-color: #fa7259;
      transform: translateY(-1px);
    }
  `}

  ${props => props.$isDelete && `
    background-color: #ff4d6d; /* Rosa avermelhado forte para Excluir (como em Produtos) */
    &:hover {
      background-color: #e60033;
      transform: translateY(-1px);
    }
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
  background: rgba(255, 255, 255, 0.95); /* Levemente mais opaco para consistência */
  padding: 30px;
  border-radius: 15px; /* Bordas arredondadas */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
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

  p { /* Mensagens de erro no modal, ou texto normal. Será substituído por ErrorMessage */
    /* Removido o estilo direto de p aqui, pois ErrorMessage terá seu próprio estilo */
  }

  .button-group { /* Para agrupar botões dentro do modal */
    display: flex;
    justify-content: center; /* Centraliza os botões */
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
    border-color: #ff69b4; /* Rosa vibrante no foco */
    box-shadow: 0 0 0 2px rgba(255, 105, 180, 0.3);
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
  box-shadow: 0 4px 10px rgba(0,0,0,0.2); /* Sombra mais destacada */

  /* Estilos para o botão de 'Criar'/'Atualizar' no modal */
  &.primary-action {
    background-color: #9fb981; /* Rosa principal */
    &:hover {
      background-color: #79896a;
      transform: translateY(-2px);
    }
    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 5px rgba(0,0,0,0.1); /* Sombra mais suave ao clicar */
    }
  }
  
  /* Estilos para o botão de 'Cancelar' no modal */
  &.secondary-action {
    background-color: #6c757d; /* Cinza */
    &:hover {
      background-color: #5a6268;
      transform: translateY(-2px);
    }
    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
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