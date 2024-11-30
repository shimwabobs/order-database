import express from 'express';
import Product from './_product.js'
import Order from './_order.js'

const api = express();

api.use('/api/v1/product',Product)
api.use('/api/v1/order',Order)

api.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Welcome to online store',
  });
});

api.use('/', (req, res) => {
  res.status(404).send({
    status: 404,
    message: 'Page not found',
  });
});

export default api;