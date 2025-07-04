import styled from "styled-components";
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: linear-gradient(135deg,rgb(225, 236, 219) 0%, #E4EFE7 100%);
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  color: #333;
`;

export const Title = styled.h2`
  color: #333;
  font-size: 2em;
  margin-bottom: 25px;
`;

export const StyledLink = styled(Link)`
  font-size: 14px;
  color: rgb(142, 155, 145);
  text-decoration: none;
  margin-top: 15px;
  transition: color 0.2s;
  &:hover {
    color: rgb(92, 100, 94);
    text-decoration: underline;
  }
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto 30px auto;
  padding: 0px;
`;

export const MetricCard = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 35px 0 rgba(31, 38, 135, 0.13);
  }

  svg {
    font-size: 32px;
  }
`;

export const MetricValue = styled.p`
  font-size: 2.2em;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

export const MetricLabel = styled.p`
  font-size: 1em;
  color: #555;
  margin: 0;
`;