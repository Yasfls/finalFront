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
  display: flex;
  flex-direction: column;
  max-height: 500px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: transparent;
  table-layout: fixed;
`;

export const TableHeader = styled.thead`
  display: block;
  width: calc(100% - var(--scrollbar-width, 0px));
  background-color: rgba(255, 255, 255, 0.8);

  tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  th {
    padding: 15px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    text-align: left;
    color: #333;
    font-weight: bold;
    box-sizing: border-box;
    word-wrap: break-word;

    &:nth-child(1) { width: 8%; text-align: center; }
    &:nth-child(2) { width: 12%; }
    &:nth-child(3) { width: 15%; }
    &:nth-child(4) { width: 20%; text-align: center; }
    &:nth-child(5) { width: 15%; text-align: center; }
    &:nth-child(6) { width: 30%; text-align: center; }
  }
`;

export const ScrollableTableBody = styled.tbody`
  display: block;
  flex-grow: 1;
  max-height: calc(500px - 50px);
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;

  &::-webkit-scrollbar {
    width: 17px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.2);
    border-radius: 10px;
    border: 3px solid transparent;
    background-clip: padding-box;
  }
  & {
    scrollbar-width: thin;
    scrollbar-color: rgba(0,0,0,0.2) transparent;
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
    box-sizing: border-box;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;

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
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  justify-content: center;
  height: 100%;
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
  white-space: nowrap;
  
  ${props => props.$isView && `
    background-color: #ff8c69;
    &:hover { background-color: #fa7259; transform: translateY(-1px); }
  `}
  ${props => props.$isPrepare && `
    color: white;
    background-color: #007bff;
    &:hover { background-color: #0056b3; transform: translateY(-1px); }
  `}
  ${props => props.$isReady && `
    color: white;
    background-color: #ffc107;
    &:hover { background-color: #e0a800; transform: translateY(-1px); }
  `}
  ${props => props.$isDeliver && `
    color: white;
    background-color: #6f42c1;
    &:hover { background-color: #563d7c; transform: translateY(-1px); }
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
    color: #ff3333;
    background-color: #ffe5e5;
    border: 1px solid #ff3333;
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
    border-color: #9fb981;
    box-shadow: 0 0 0 2px rgba(159, 185, 129, 0.3);
  }
`;

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