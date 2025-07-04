import 'dotenv/config';
import express from 'express';
import db from './models/index.js';
import swaggerDocs from './docs/swagger.js';
import cors from 'cors'; 

const app = express();
app.use(express.json());
app.use(cors()); 

import usersRouter from './routes/users.js'; 
app.use('/api/users', usersRouter); 

import categoriesRouter from './routes/categories.js';
app.use('/api/categories', categoriesRouter);

import ordersRouter from './routes/orders.js';
app.use('/api/orders', ordersRouter);

import productsRouter from './routes/products.js';
app.use('/api/products', productsRouter);

swaggerDocs(app);

db.sequelize.sync().then((req) => {
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
});