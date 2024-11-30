
import express from 'express';
import ProductController from './../controllers/productcontroller.js';

const router = express.Router();

router.post(
  '/addproduct',
  ProductController.addProduct
);
router.get(
    '/allproducts',
    ProductController.getAllProducts
  );
  
  router.put(
    '/updateproduct',
    ProductController.updateProduct
  );
  

export default router;
