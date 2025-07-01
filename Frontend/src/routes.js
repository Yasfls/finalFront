import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Logout from './pages/Logout';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Categories from './pages/Categories'; // <-- IMPORTANTE: Importar o novo componente
import App from './pages/App';
import Sidebar from "./components/Sidebar";
import { isAuthenticated } from "./services/auth";

const MainPage = () => <Main />
const LoginPage = () => <Login />
const LogoutPage = () => <Logout />
const NotFoundPage = () => <NotFound />
const RegisterPage = () => <Register />
const ProductsPage = () => <Products />
const OrdersPage = () => <Orders />
const CategoriesPage = () => <Categories /> // <-- NOVO: Definir o componente da rota

const AppPage = () => {
    if (!isAuthenticated()){
        return <Navigate to="/" replace />;
    }
    return <App />;
}

const Rotas = () => (
    <Router>
        <Sidebar /> {/* Sidebar é renderizado em todas as rotas */}
        <div style={{ marginLeft: '60px' }}> {/* Adicionado um margin-left simples para não sobrepor a sidebar */}
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/logout' element={<LogoutPage />} />
                <Route path='/app' element={<AppPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/products' element={<ProductsPage />} />
                <Route path='/orders' element={<OrdersPage />} />
                <Route path='/categories' element={<CategoriesPage />} /> {/* <-- NOVO: Adicionar a rota para Categorias */}
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </div>
    </Router> 
);

export default Rotas;