import Order from "../models/order.js";
import Product from "../models/product.js";

const OrderController={
    makeOrder:async(req,res)=>{
        try{
    
            const{customer_name,customer_email,productId,quantity}=req.body;
            const product= await Product.findOne({where:{id:productId},attributes:['stock','price']});
            if(!product){
               return res.status(404).json({message:"Product not found"});
            }
            if(quantity>product.stock){
                return res.status(404).json({message:"Insufficient stock"});
            }
            const totalprice= parseFloat(product.price*quantity).toFixed(2);
            const result=await Order.create({customer_name,customer_email,productId,quantity,totalprice});
            const remainStock=product.stock-quantity
            const updatedStock=await Product.update({stock:remainStock},{where:{id:productId}});
            return res.status(201).json(result)
        }catch(error){
            console.log(error);
           return res.status(500).json({
                message:"Error to add",
                error:error.message
            })
        }
    }
}

export default OrderController;