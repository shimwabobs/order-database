import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Product=sequelize.define("products",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type:DataTypes.TEXT,
    },
    price:{
        type:DataTypes.DECIMAL,
        allowNull:false
    },
    stock:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    }
});

export default Product;