const express=require("express");
const userController=require("./controllers/user.controller")
const galleryController=require("./controllers/gallary.controller")
const app=express()

app.use(express.json());

app.use("/users",userController)
app.use("/gallery",galleryController)

module.exports=app;