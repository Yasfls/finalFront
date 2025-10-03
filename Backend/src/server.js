import 'dotenv/config';
import express from 'express';
import db from './models/index.js';
import swaggerDocs from './docs/swagger.js';
import cors from 'cors'; 
import helmet from 'helmet'; // 🔐 Adicionado: Headers de segurança
import cookieParser from 'cookie-parser'; // 🔐 Adicionado: Para Cookies HttpOnly

const app = express();

// 🔐 Configuração de Segurança: Helmet para HTTP Headers
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"], // Pode ser ajustado se usar CDNs
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
        },
    },
}));

// 🔐 Middleware: Limita o tamanho do JSON e usa express.json()
app.use(express.json({ limit: '10kb' })); // Limita o payload
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 🔐 Middleware: Cookie Parser
app.use(cookieParser());

// Configuração CORS (Permite a troca de cookies)
app.use(cors({
    origin: 'http://localhost:3001', // Ajuste para a URL do seu frontend
    credentials: true, // Essencial para HttpOnly cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
})); 

// 📁 Servir Anexos de forma estática (necessário criar a pasta 'attachments')
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/attachments', express.static(path.join(__dirname, 'attachments')));


// ROTAS ATUALIZADAS
import usersRouter from './routes/users.js'; 
app.use('/api/users', usersRouter); 

import categoriesRouter from './routes/categories.js'; // Categoria de Gastos/Receitas
app.use('/api/categories', categoriesRouter);

import transactionsRouter from './routes/transactions.js'; // Transações
app.use('/api/transactions', transactionsRouter);

// ROTAS ANTIGAS REMOVIDAS: ordersRouter, productsRouter

swaggerDocs(app);

// Sincroniza o DB e inicia o servidor
db.sequelize.sync().then((req) => {
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
});