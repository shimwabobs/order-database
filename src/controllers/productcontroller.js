import Product from "../models/product.js";

const ProductController={ 
    addProduct: async(req,res)=>{
        try{
            const {name,description,price,stock}=req.body;
            const result= await Product.create({name,description,price,stock});
            res.status(201).json(result);
        }catch(error){
            res.status(500).json({message:"Unable to add",error:error.message});
        }
    },
    getAllProducts:async(req,res)=>{
        try{
            const result= await Product.findAll();
            res.status(200).json(result)
        }catch(error){
            res.status(500).json({
                message:"Error to fetch products",
                error:error.message
            });
        }
    },
    updateProduct:async(req,res)=>{
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
    }
};

export default ProductController;