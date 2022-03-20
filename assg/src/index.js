const express= require("express");
const app=express()
const userController=require("./controller/user.controller")
const  {register,login}=require("./controller/auth.controllers");
const productController=require("./controller/product.controller")

app.use(express.json());
app.use("/users",userController);
app.post("/register" ,register)
app.post("/login",login)
app.use("/products", productController)






module.exports=app;

