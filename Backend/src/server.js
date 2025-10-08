import 'dotenv/config';
import express from 'express';
import db from './models/index.js';
import swaggerDocs from './docs/swagger.js';
import cors from 'cors'; 
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

const app = express();

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
        },
    },
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
})); 

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/attachments', express.static(path.join(__dirname, 'attachments')));

import usersRouter from './routes/users.js'; 
app.use('/api/users', usersRouter); 

import categoriesRouter from './routes/categories.js';
app.use('/api/categories', categoriesRouter);

import transactionsRouter from './routes/transactions.js';
app.use('/api/transactions', transactionsRouter);

swaggerDocs(app);

db.sequelize.sync().then((req) => {
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
});