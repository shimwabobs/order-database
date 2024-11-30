import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";


const Order=sequelize.define("orders",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    customer_name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[8,50]
        }
    },
    customer_email:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isEmail:true
        }
    },
    product_id:{
        type:DataTypes.STRING,
        
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    totalprice:{
        type:DataTypes.DECIMAL,
    }
});

export default Order;