import sequelize from "./db/db.js";
import ApiKey from "./models/apiKeys.js";
import api from "./routers/index.js";
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
app.use('/',api)

app.listen(port,host,()=>{
    console.log("Works")
})