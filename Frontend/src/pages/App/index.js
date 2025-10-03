import React, { useState, useEffect } from "react";
import { Container, Title, StyledLink, MetricsGrid, MetricCard, MetricValue, MetricLabel } from "./style";
import { AiFillDollarCircle, AiOutlineTag } from 'react-icons/ai'; // Ícones atualizados
import api from "../../services/api";
 
const App = () => {
  const [balance, setBalance] = useState("0.00"); // 💰 NOVO: Saldo
  const [totalTransactions, setTotalTransactions] = useState(0); // 💰 NOVO: Total de Transações
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // 💰 API para Saldo
        const balanceResponse = await api.get("/api/transactions/balance");
        setBalance(balanceResponse.data.balance);
 
        // 💰 API para Total de Transações
        const transactionsResponse = await api.get("/api/transactions/all");
        setTotalTransactions(transactionsResponse.data.length);
 
        setLoading(false);
      } catch (err) {
        console.error("Erro ao carregar métricas:", err.response || err);
        setError("Não foi possível carregar as métricas financeiras.");
        setLoading(false);
      }
    };
 
    fetchMetrics();
  }, []);
 
  // Determina a cor do saldo
  const balanceColor = parseFloat(balance) >= 0 ? "#198754" : "#dc3545";
 
  return (
<Container>
<Title>Balanço Financeiro</Title> {/* Título atualizado */}
 
      {loading && <p>Carregando dados...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
 
      {!loading && !error && (
<MetricsGrid>
<MetricCard>
<AiFillDollarCircle size={40} color={balanceColor} />
<MetricValue style={{ color: balanceColor }}>
                R$ {balance.replace('.', ',')}
</MetricValue>
<MetricLabel>Saldo Atual</MetricLabel>
</MetricCard>
 
          <MetricCard>
<AiOutlineTag size={40} color="#9fb981" />
<MetricValue>{totalTransactions}</MetricValue>
<MetricLabel>Total de Transações</MetricLabel>
</MetricCard>
</MetricsGrid>
      )}
 
      <p>Gerencie suas receitas e despesas com segurança!</p>
</Container>
  );
};
 
export default App;