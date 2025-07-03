import 'dotenv/config';
import express from 'express';
import db from './models/index.js';
import swaggerDocs from './docs/swagger.js';
import cors from 'cors'; // IMPORTANTE: Importar o módulo cors

const app = express();
app.use(express.json());
app.use(cors()); // IMPORTANTE: Adicionar o middleware CORS aqui, antes das rotas

//Rotas da pasta "routes"
import usersRouter from './routes/users.js'; 
app.use('/api/users', usersRouter); 

import categoriesRouter from './routes/categories.js';
app.use('/api/categories', categoriesRouter);

import ordersRouter from './routes/orders.js';
app.use('/api/orders', ordersRouter);

import productsRouter from './routes/products.js';
app.use('/api/products', productsRouter);

swaggerDocs(app);

//nicialização do servidor na porta 3000
db.sequelize.sync().then((req) => {
  app.listen(3001, () => {
    console.log('Servidor rodando na porta 3000');
  });
});