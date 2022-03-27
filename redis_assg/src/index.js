const express= require("express")
const app= express();

const todosController=require("./controller/product.controller")
app.use(express.json())
app.use("/todos", todosController);
module.exports=app;