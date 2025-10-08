import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// 🚨 Importar o componente GlobalStyle
import GlobalStyle from './GlobalStyle'; 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
    {/* 🚨 Aplicar o reset CSS global */}
<GlobalStyle /> 
<App />
</React.StrictMode>
);