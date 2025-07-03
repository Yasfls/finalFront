import styled from "styled-components";
import { Link } from 'react-router-dom'; // Importar Link para StyledLink

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); /* Fundo gradiente rosa/roxo suave */
  padding: 2rem;
`;

export const Title = styled.h2`
  color: #333;
  font-size: 2.2rem;
  margin-bottom: 2.5rem;
  text-align: center;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.2); /* Fundo branco transparente */
  border: 1px solid rgba(255, 255, 255, 0.3); /* Borda sutil para o efeito de vidro */
  padding: 60px 40px 30px; /* Mais padding no topo para o ícone */
  border-radius: 20px; /* Bordas mais arredondadas */
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1); /* Sombra mais difusa */
  backdrop-filter: blur(10px); /* Efeito de desfoque de vidro */
  -webkit-backdrop-filter: blur(10px); /* Compatibilidade com navegadores Webkit */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const IconWrapper = styled.div`
  background-color: #ff69b4; /* Rosa vibrante para o círculo do ícone */
  border-radius: 50%;
  padding: 15px;
  position: absolute;
  top: -40px; /* Posição para ficar acima do card */
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 2; /* Garante que o ícone fique na frente */
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Mensagem de erro dentro do formulário
export const ErrorMessage = styled.p`
  color: #ff3333;
  margin-bottom: 15px;
  border: 1px solid #ff3333;
  padding: 10px;
  width: 100%;
  text-align: center;
  border-radius: 4px;
  background-color: #ffe5e5;
`;

// Componente Input para reutilizar
export const Input = styled.input`
  height: 50px;
  margin-bottom: 20px;
  padding: 0 15px;
  color: #333;
  font-size: 16px;
  width: 100%;
  border: none; /* Sem borda, para o efeito de vidro */
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.7); /* Fundo do input levemente transparente */
  box-shadow: 0 2px 5px rgba(0,0,0,0.05); /* Sombra sutil nos inputs */

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.9); /* Mais opaco ao focar */
    border-color: #ff69b4; /* Borda rosa suave ao focar */
    box-shadow: 0 0 0 2px rgba(255, 105, 180, 0.3);
  }

  &::placeholder {
    color: #888;
  }
`;

// Componente Button para reutilizar
export const Button = styled.button`
  color: #fff;
  font-size: 18px;
  background: #ff69b4; /* Rosa vibrante */
  height: 55px;
  border: none;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0 5px 15px rgba(255, 105, 180, 0.4); /* Sombra rosa para o botão */

  &:hover {
    background: #e85a9f; /* Rosa um pouco mais escuro no hover */
    transform: translateY(-3px); /* Efeito de "levantar" */
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba(255, 105, 180, 0.3);
  }
`;

// Linha divisória
export const Divider = styled.hr`
  margin: 30px 0;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3); /* Linha divisória mais sutil */
  width: 100%;
`;

// Link estilizado
export const StyledLink = styled(Link)`
  font-size: 15px;
  color: #ff69b4; /* Links em rosa */
  text-decoration: none;
  margin-top: 5px;
  transition: color 0.2s;
  &:hover {
    color: #e85a9f;
    text-decoration: underline;
  }
`;