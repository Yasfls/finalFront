import styled from "styled-components";

// Estilos gerais da página (Container)
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); /* Fundo gradiente rosa/roxo suave */
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

// Estilo para o título da página
export const Title = styled.h1`
  color: #333;
  font-size: 2.2em;
  margin-bottom: 25px;
  text-align: center;
`;

// Estilo para o botão principal (Criar Nova Categoria)
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

// Estilo para a tabela
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.7); /* Fundo transparente para o efeito de vidro */
  border-radius: 10px;
  overflow: hidden; /* Garante que as bordas arredondadas funcionem */
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
  }
`;

// NOVO: Wrapper para os botões de ação da tabela (garante organização vertical)
export const ActionButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column; /* Coloca um embaixo do outro */
  gap: 5px; /* Espaçamento entre eles */
  align-items: flex-start; /* Alinha à esquerda na célula */
  /* Remove o margin-right do ActionButton se ele não for mais útil aqui */
`;

// Estilos para os botões de ação dentro da tabela (Editar/Excluir)
export const ActionButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  /* margin-right: 8px; <-- REMOVIDO, pois o gap do ActionButtonsWrapper cuida do espaçamento */
  transition: background-color 0.3s ease, transform 0.2s ease;
  color: white;
  width: 100px; /* Largura fixa para manter alinhamento vertical mais limpo */
  text-align: center; /* Centraliza o texto dentro do botão */
  box-shadow: 0 2px 5px rgba(0,0,0,0.1); /* Sombra para os botões de ação */

  ${props => props.$isEdit && `
    background-color: #ff8c69; /* Laranja Rosado para Editar */
    &:hover {
      background-color: #fa7259;
      transform: translateY(-1px);
    }
  `}

  ${props => props.$isDelete && `
    background-color: #ff4d6d; /* Rosa avermelhado forte para Excluir */
    &:hover {
      background-color: #e60033; /* Vermelho mais intenso */
      transform: translateY(-1px);
    }
  `}
`;


// Estilos para o overlay do modal
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

// Estilos para o conteúdo do modal
export const ModalContent = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 15px;
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

  p { /* Mensagens de erro no modal */
    color: #ff3333;
    background-color: #ffe5e5;
    border: 1px solid #ff3333;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
  }

  .button-group { /* Para agrupar botões dentro do modal */
    display: flex;
    justify-content: center; /* CENTRALIZA OS BOTÕES */
    gap: 10px;
    margin-top: 20px;
  }
`;

/* COMPONENTES GENÉRICOS DE FORMULÁRIO (Input e Button) */
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
    background-color: #ff69b4; /* Rosa principal */
    &:hover {
      background-color: #e85a9f;
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