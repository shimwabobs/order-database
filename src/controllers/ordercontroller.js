import Order from "../models/order.js";

const OrderController={
    makeOrder:async(req,res)=>{
        try{
    
            const{customer_name,customer_email,id,quantity}=req.body;
            const product= await Product.findOne({where:{id:id},attributes:['stock','price']});
            if(!product){
                res.status(404).json({message:"Product not found"});
            }
            if(quantity>product.stock){
                res.status(404).json({message:"Insufficient stock"});
            }
            const totalprice= parseFloat(product.price*quantity).toFixed(2);
            const result=await Order.create({customer_name,customer_email,id,quantity,totalprice});
            const remainStock=product.stock-quantity
            const updatedStock=await Product.update({stock:remainStock},{where:{id:id}});
            res.status(201).json(result)
        }catch(error){
            res.status(500).json({
                message:"Error to add",
                error:error.message
            })
        }
    }
}

export default OrderController;