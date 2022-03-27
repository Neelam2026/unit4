const express=require("express");
const userController=require("./controllers/user.controller")
const gallaryController=require("./controllers/gallary.controller")
const app=express()

app.use(express.json());

app.use("/users",userController)
app.use("/gallary",gallaryController)

module.exports=app;