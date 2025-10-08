import React from "react";
import { isAuthenticated } from "../../services/auth"; 
import { Container, Title, HomeContent, FeatureList, FeatureItem, StatGrid, StatCard, StatValue, StatLabel, StyledLink } from "./style";
 
const Main = () => {
  const authenticated = isAuthenticated(); 
  const stats = [
    { value: '100%', label: 'Proteção Contra Ataques' },
    { value: '5K+', label: 'Transações Seguras' },
    { value: 'R$ 0', label: 'Custo Mensal (Grátis)' },
  ];
 
  return (
<Container>
<Title>ATLAS BANK</Title>
<HomeContent>
<h1>Sua Gestão Financeira Pessoal, Descomplicada e Segura.</h1>
<p>O ATLAS BANK transforma o controle de gastos complexo em uma tarefa simples e protegida contra as principais vulnerabilidades web.</p>
 
        <FeatureList>
<FeatureItem>1. Registre receitas e despesas em segundos.</FeatureItem>
<FeatureItem>2. Anexe comprovantes digitais (PDF/Imagem) de forma segura.</FeatureItem>
<FeatureItem>3. Mantenha seu histórico financeiro organizado por categorias.</FeatureItem>
</FeatureList>

<StatGrid>
          {stats.map((stat, index) => (
<StatCard key={index}>
<StatValue>{stat.value}</StatValue>
<StatLabel>{stat.label}</StatLabel>
</StatCard>
          ))}
</StatGrid>

        {!authenticated ? (
<div style={{ marginTop: '30px' }}>
<StyledLink to="/register" $isPrimary>Criar Conta Grátis</StyledLink>
<p style={{ marginTop: '15px', fontSize: '1em' }}>
              Já tem uma conta? <StyledLink to="/login">Faça Login</StyledLink>
</p>
</div>
        ) : (
<div style={{ marginTop: '30px', padding: '10px', backgroundColor: '#e1ecdb', borderRadius: '8px' }}>
<p style={{ color: '#198754', fontWeight: 'bold' }}>
              Bem-vindo(a)! Use o menu lateral para gerenciar suas finanças.
</p>
<StyledLink to="/app">Ir para o Balanço</StyledLink>
</div>
        )}
</HomeContent>
</Container>
  );
};
export default Main;