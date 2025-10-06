import styled from "styled-components";
import { Link } from 'react-router-dom';
 
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  background: linear-gradient(135deg,rgb(225, 236, 219) 0%, #E4EFE7 100%);
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
`;
 
export const Title = styled.h2`
  color: #333;
  font-size: 2.2rem;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;
 
export const HomeContent = styled.div`
  width: 90%;
  max-width: 700px;
  margin: 0 auto;
  padding: 40px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
 
  h1 {
    font-size: 1.8em;
    color: #49524b;
    margin-bottom: 10px;
  }
  p {
    color: #6c757d;
    font-size: 1.1em;
    margin-bottom: 25px;
  }
`;
 
export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 25px 0;
  text-align: left;
  border-left: 3px solid #99BC85;
  padding-left: 20px;
`;
 
export const FeatureItem = styled.li`
  margin-bottom: 10px;
  font-size: 1.05em;
  color: #49524b;
  font-weight: 500;
`;
 
export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin: 30px 0;
`;
 
export const StatCard = styled.div`
  background: #e1ecdb;
  padding: 20px 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`;
 
export const StatValue = styled.p`
  font-size: 1.8em;
  font-weight: bold;
  color: #198754;
  margin: 0 0 5px 0;
`;
 
export const StatLabel = styled.p`
  font-size: 0.9em;
  color: #6c757d;
  margin: 0;
`;
 
export const StyledLink = styled(Link)`
  display: inline-block;
  padding: 12px 25px;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
  ${props => props.$isPrimary ? `
    background-color: #99BC85;
    color: white;
    box-shadow: 0 4px 10px rgba(122, 146, 107, 0.4);
&:hover {
      background-color: rgb(120, 138, 110);
      transform: translateY(-2px);
    }
  ` : `
    color: #49524b;
    margin-left: 10px;
&:hover {
      text-decoration: underline;
    }
  `}
`;