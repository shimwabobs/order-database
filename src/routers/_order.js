
import express from 'express';
import OrderController from './../controllers/ordercontroller.js';

const router = express.Router();
router.post(
  '/addorder',
  OrderController.makeOrder
);

export default router;
