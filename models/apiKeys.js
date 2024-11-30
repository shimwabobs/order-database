import { DataTypes, ENUM } from "sequelize";
import sequelize from "../db/db.js";

const ApiKey= sequelize.define("apiKeys",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    key:{
        type:DataTypes.STRING,
        set:"T678JK",
        allowNull:false
    }
})

export default ApiKey;