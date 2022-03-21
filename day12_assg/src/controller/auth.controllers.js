const User=require("../models/user.model");
require('dotenv').config()
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const generateToken=(user)=>{
    // return jwt.sign({ user }, 'masai');
    return jwt.sign({user},process.env.SECRECT_KEY);
}


const register=async(req,res)=>{
    try{
        const errors = validationResult(req);
      console.log({ errors });
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }


      let user = await User.findOne({email : req.body.email})
        if(user){
            return res.status(400).send({message : "Email already exists" })
        }
     user= await User.create(req.body);
     const token =generateToken(user)
     return res.status(200).send({user,token});
    }
    catch(err){
        res.status(400).send({message : err.message})
    }
}


const login = async(req,res)=>{
    try{
        const user = await User.findOne({email : req.body.email})
        if(!user){
            return res.status(400).send("Wrong Email or Password")
        }
        const match = user.checkPassword(req.body.password)
        if(!match){
            return res.status(400).send({message : "Wrong Email or Password"})
        }

        const token = generateToken(user)
        return res.status(200).send({user, token});
    }
    catch(err){
        res.status(400).send({message : err.message})
    }
}


module.exports = {register,login}