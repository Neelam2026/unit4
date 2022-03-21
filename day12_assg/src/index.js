const express= require("express");
const { body, validationResult } = require('express-validator');
//console.log(body())
const app=express()
const userController=require("./controller/user.controller")
const  {register,login}=require("./controller/auth.controllers");
const productController=require("./controller/product.controller")

app.use(express.json());

app.use("/users",userController);

app.post("/register",body("name").trim().not().isEmpty().bail().withMessage("fill name").isLength({min:3,max:30}).withMessage("First Name must be at least 3 characters"),
body("email").trim().not().isEmpty().bail().withMessage("fill email").isEmail().withMessage("enter valid email")
,register);


app.post("/login",body("email").trim().not().isEmpty().bail().withMessage("fill email").isEmail().withMessage("enter valid email"),
body("password").not().isEmpty().withMessage("Password is required")
.custom((value) => {
  const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/;
  if (!value.match(passw)) {
    throw new Error("Password must be strong");
  }
  return true;
}),
login);



app.use("/products", productController)


module.exports=app;

