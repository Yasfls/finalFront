import styled from "styled-components";
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg,#F2EDE7 0%, #4d8f65 100%);
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
  background: rgba(242, 237, 231, 0.65);
  padding: 60px 40px 30px;
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const IconWrapper = styled.div`
  background-color: #4d8f65;
  border-radius: 50%;
  padding: 15px;
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.input`
  height: 50px;
  margin-bottom: 20px;
  padding: 0 15px;
  color: #333;
  font-size: 16px;
  width: 100%;
  border: none;
  border-radius: 8px;
  background: rgb(255, 255, 255);
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 0 2px #99BC85;
  }

  &::placeholder {
    color: #888;
  }
`;

export const Button = styled.button`
  color: #fff;
  font-size: 18px;
  background: #4d8f65;
  height: 55px;
  border: none;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0 5px 15px rgba(122, 146, 107, 0.4);

  &:hover {
    background: #3a6b4c;
    transform: translateY(-3px);
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba(122, 146, 107, 0.4);
  }
`;

export const Divider = styled.hr`
  margin: 30px 0;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  width: 100%;
`;

export const StyledLink = styled(Link)`
  font-size: 15px;
  color: #49524b;
  text-decoration: none;
  margin-top: 5px;
  transition: color 0.2s;
  &:hover {
    color: #3a6b4c;
  }
`;