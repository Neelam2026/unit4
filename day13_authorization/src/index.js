const express= require("express");
const app=express()
const { body, validationResult } = require('express-validator');
const userController=require("./controller/user.controller")
const  {register,login,generateToken}=require("./controller/auth.controllers");

const productController=require("./controller/product.controller")
/////
const passport=require("./configs/google_oauth")
app.use(express.json());
app.use("/users",userController);

app.post("/register",body("name").trim().not().isEmpty().bail().withMessage("fill name").isLength({min:3,max:30}).withMessage("First Name must be at least 3 characters"),
body("email").trim().not().isEmpty().bail().withMessage("fill email").isEmail().withMessage("enter valid email")
,register);



app.post("/login",body("email").trim().not().isEmpty().bail().withMessage("fill email").isEmail().withMessage("enter valid email"),
login);

app.use("/products", productController)

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    const token=generateToken(req.user)
    return res.status(200).send({user:req.user, token})
  });

module.exports=app;

