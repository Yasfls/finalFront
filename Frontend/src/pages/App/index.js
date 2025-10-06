import React, { useState, useEffect } from "react";
import { 
  Container, 
  Title, 
  MetricsGrid, 
  MetricCard, 
  MetricValue, 
  MetricLabel 
} from "./style";
import { AiFillDollarCircle, AiOutlineTag } from 'react-icons/ai';
import api from "../../services/api";
 
const App = ({ refreshKey = 0 }) => {
  const [balance, setBalance] = useState("0.00");
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  const fetchMetrics = async () => {
    setLoading(true);
    setError(null);
    try {
      // 💰 Busca o saldo (agora considerando todas as transações)
      const balanceResponse = await api.get("/api/transactions/balance");
      setBalance(balanceResponse.data.balance);
 
      // 💳 Busca o total de transações
      const transactionsResponse = await api.get("/api/transactions/all");
      setTotalTransactions(transactionsResponse.data.length);
 
      setLoading(false);
    } catch (err) {
      console.error("Erro ao carregar métricas:", err.response || err);
      setError("Não foi possível carregar as métricas financeiras.");
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchMetrics();
  }, [refreshKey]);
 
  // Define cor do saldo (verde = positivo, vermelho = negativo)
  const balanceColor = parseFloat(balance) >= 0 ? "#198754" : "#dc3545";
 
  return (
<Container>
<Title>Balanço Financeiro</Title>
 
      {loading && <p>Carregando dados...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
 
      {!loading && !error && (
<MetricsGrid>
<MetricCard>
<AiFillDollarCircle size={40} color={balanceColor} />
<MetricValue style={{ color: balanceColor }}>
              {parseFloat(balance) < 0 ? "- " : ""}
              R$ {Math.abs(parseFloat(balance)).toFixed(2).replace('.', ',')}
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