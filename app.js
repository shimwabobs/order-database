import sequelize from "./db/db.js";
import ApiKey from "./models/apiKeys.js";
import Order from "./models/order.js";
import Product from "./models/product.js";
import express from "express";
import logger from "morgan";

const syncDb=async()=>{
    try{
        await sequelize.sync({alter:true});
        console.log("Synced successful");
    }
    catch(error){
        console.log("Not synced");
    }
}

syncDb();

const app = express();
const port=5660;
const host="localhost";

app.use(logger("dev"));
app.use(express.json());

app.post("/addproduct",async(req,res)=>{
    try{
        const {name,description,price,stock}=req.body;
        const result= await Product.create({name,description,price,stock});
        res.status(201).json(result);
    }catch(error){
        res.status(500).json({message:"Unable to add",error:error.message});
    }
})

app.get("/product",async(req,res)=>{
    try{
        const result= await Product.findAll();
        res.status(200).json(result)
    }catch(error){
        res.status(500).json({
            message:"Error to fetch products",
            error:error.message
        });
    }
})

app.put("/product/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const {stock}=req.body;    
        const result= await Product.update({stock:stock},{where:{id:id}});
        res.status(200).json(result)
    }catch(error){
        res.status(500).json({
            message:"Unable to update",
            error:error.message
        })
    }
});

app.post("/addorder",async(req,res)=>{
    try{
        /*const apiKey= req.headers["x-api-key"];
        const validateKey=await ApiKey.findOne({where:{key:apiKey}});
        if(!validateKey){
            res.json({message:"Wrong key"})
        }*/
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
});

app.listen(port,host,()=>{
    console.log("Works")
})