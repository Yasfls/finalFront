import React, { useState, useEffect } from "react";
import { Container, Title, StyledLink, MetricsGrid, MetricCard, MetricValue, MetricLabel } from "./style";
import { AiOutlineShoppingCart, AiOutlineTag } from 'react-icons/ai';
import api from "../../services/api";

const App = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const productsResponse = await api.get("/api/products/AllProducts");
        setTotalProducts(productsResponse.data.length);

        const ordersResponse = await api.get("/api/orders/AllOrders");
        setTotalOrders(ordersResponse.data.length);

        setLoading(false);
      } catch (err) {
        console.error("Erro ao carregar métricas:", err);
        setError("Não foi possível carregar as métricas.");
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <Container>
      <Title>Dashboard</Title>

      {loading && <p>Carregando métricas...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <MetricsGrid>
          <MetricCard>
            <AiOutlineTag size={40} color="#9fb981" />
            <MetricValue>{totalProducts}</MetricValue>
            <MetricLabel>Total de Produtos</MetricLabel>
          </MetricCard>

          <MetricCard>
            <AiOutlineShoppingCart size={40} color="#9fb981" />
            <MetricValue>{totalOrders}</MetricValue>
            <MetricLabel>Total de Pedidos</MetricLabel>
          </MetricCard>
        </MetricsGrid>
      )}

      <p>Bem-vindo ao sistema de gerenciamento!</p>
      <StyledLink to="/logout">Logout</StyledLink>
    </Container>
  );
};

export default App;