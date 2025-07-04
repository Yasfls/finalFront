import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: linear-gradient(135deg,rgb(225, 236, 219) 0%, #E4EFE7 100%);
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
  padding: 8px 18px;
  background-color: #9fb981;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 10px rgba(159, 185, 129, 0.3);
  margin-bottom: 20px;
  width: fit-content;
  align-self: center;
  
  &:hover {
    background-color: #79896a;
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
  }
`;

export const TableContainer = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  overflow: hidden;
  margin-bottom: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: transparent;
`;

export const TableHeader = styled.thead`
  display: table;
  width: 100%;
  table-layout: fixed;
  background-color: rgba(255, 255, 255, 0.8);

  th {
    padding: 15px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    text-align: left;
    color: #333;
    font-weight: bold;
  }
`;

export const ScrollableTableBody = styled.tbody`
  display: block;
  max-height: 400px;
  overflow-y: auto;
  width: 100%;

  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  & {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  tr {
    display: table;
    width: 100%;
    table-layout: fixed;
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
    vertical-align: top;
  }
`;

export const ActionButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
`;

export const ActionButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.85em;
  transition: background-color 0.3s ease, transform 0.2s ease;
  color: white;
  width: 90px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  
  ${props => props.$isEdit && `
    background-color: #ff8c69;
    &:hover { background-color: #fa7259; transform: translateY(-1px); }
  `}
  
  ${props => props.$isDelete && `
    background-color: #ff4d6d;
    &:hover { background-color: #e60033; transform: translateY(-1px); }
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
  
  p {
    color: #ff3333;
    background-color: #ffe5e5;
    border: 1px solid #ff3333;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
  }
  
  .button-group {
    display: flex;
    justify-content: center;
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
    border-color: #9fb981;
    box-shadow: 0 0 0 2px rgba(159, 185, 129, 0.3);
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
    border-color: #9fb981;
    box-shadow: 0 0 0 2px rgba(159, 185, 129, 0.3);
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
    background-color: #9fb981;
    &:hover {
      background-color: #79896a;
      transform: translateY(-2px);
    }
    &:active {
      transform: translateY(0);
    }
  }
  &.secondary-action {
    background-color: #6c757d;
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
    border-color: #ff69b4;
    box-shadow: 0 0 0 2px rgba(255, 105, 180, 0.3);
  }
`;