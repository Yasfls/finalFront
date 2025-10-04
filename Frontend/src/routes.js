import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Logout from './pages/Logout';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
// ⚠️ REMOVIDO: import Products from './pages/Products';
// ⚠️ RENOMEADO: import Transactions from './pages/Transactions'; (Novo nome do componente)
import Transactions from './pages/Transactions'; 
import Categories from './pages/Categories';
import App from './pages/App';
import Sidebar from "./components/Sidebar";
import { isAuthenticated } from "./services/auth";
import { SidebarProvider, useSidebar } from "./contexts/SidebarContext";
 
const MainContentWrapper = ({ children }) => {
  const { isSidebarOpen } = useSidebar();
  return (
<div style={{ marginLeft: isSidebarOpen ? '200px' : '60px', transition: 'margin-left 0.3s ease-in-out' }}>
      {children}
</div>
  );
};
 
const MainPage = () => <Main />
const LoginPage = () => <Login />
const LogoutPage = () => <Logout />
const NotFoundPage = () => <NotFound />
const RegisterPage = () => <Register />
// ⚠️ REMOVIDO: const ProductsPage = () => <Products />
const TransactionsPage = () => <Transactions /> // RENOMEADO
const CategoriesPage = () => <Categories />
 
const AppPage = () => {
  if (!isAuthenticated()){
    return <Navigate to="/" replace />;
  }
  return <App />;
}
 
const Rotas = () => (
<Router>
<SidebarProvider>
<Sidebar />
<MainContentWrapper>
<Routes>
<Route path='/' element={<MainPage />} />
<Route path='/login' element={<LoginPage />} />
<Route path='/logout' element={<LogoutPage />} />
<Route path='/app' element={<AppPage />} />
<Route path='/register' element={<RegisterPage />} />
          {/* ⚠️ REMOVIDO: <Route path='/products' element={<ProductsPage />} /> */}
<Route path='/transactions' element={<TransactionsPage />} /> {/* ROTA RENOMEADA */}
<Route path='/categories' element={<CategoriesPage />} />
<Route path='/*' element={<NotFoundPage />} />
</Routes>
</MainContentWrapper>
</SidebarProvider>
</Router>
);
export default Rotas;