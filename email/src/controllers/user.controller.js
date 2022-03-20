

const express=require("express");
const router=express.Router()
const User=require("../models/users.model")

const transporter=require("../config/mail");
const path=require("path")

router.get("",async(req,res)=>{
    try{
    const page = req.query.page || 1;
    const pagesize = req.query.pagesize || 10;
    const skip = (page - 1) * pagesize;
    const users= await User.find().skip(skip).limit(pagesize).lean().exec();
    const totalPages = Math.ceil(
        (await User.find().countDocuments()) / pagesize
      );
    return res.status(200).send({users:users, totalpages:totalPages})
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
})



router.post("/",async(req,res)=>{
    try{
        const user= await User.create(req.body);

         transporter.sendMail({
            from: '"Amazon admin" <admin@amazon.com>', // sender address
            to: user.email,
            subject:`Welcome to ABC system ${user.first_name} ${user.last_name} `, // Subject line
            text: `Hi ${user.first_name}`, 
            html: `<b>Hi ${user.first_name}</b>`, // html body
          });
          transporter.sendMail({
            from: '"Amazon admin" <admin@amazon.com>', // sender address
            to:  ["admin1@.com","admin2@.com","admin3@.com","admin4@.com","admin5@.com"],
            subject:`${user.first_name} ${user.last_name} `, // Subject line
            text: `Please welcome ${user.first_name} ${user.last_name}`, 
            html: `<b>Please welcome ${user.first_name} ${user.last_name}</b>`, // html body
          });
       
         return res.status(201).send({ user:user });  
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
})

module.exports = router;