const User=require("../models/user.model");
const express=require("express")
const router= express.Router();
const fs = require('fs');
const upload=require("../middleware/upload")

router.get("",async(req,res)=>{
    try{
        const users= await User.find().lean().exec();

        return res.status(200).send(users);
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
})

router.post("", upload.single("profile_pic"),async(req,res)=>{
    try{
        console.log("req.file.path:",req.file.path)
     const user=await User.create({
         first_name:req.body.first_name,
         last_name:req.body.last_name,
         profile_pic:req.file.path,
        });
        console.log("user:",user)       
        return res.status(201).send(user)

    }
    catch(err){
        return res.status(500).send({message:err.message})   
    }
})



router.patch("/:id",async(req,res)=>{
    try{
    const user = await User.findById({__id:req.params.id}).lean().exec()
    if(user){
        unlink(user.profile_pic, (err) => {
            if (err) throw err;
            User.findByIdAndUpdate({__id:req.params.id},{profile_pic:req.file.path}).lean().exec()
          });
    } else{
         return res.send("invalid user id")
    } 
    
    
    return res.status(200).send(user)
    }catch(err){
        console.log(err.message)
        return res.status(400).send(err.message)
    }
})
router.delete("/:id",async(req,res)=>{
    try{
    const user = await User.findById({_id:req.params.id}).lean().exec()
    if(user){
        fs.unlink(user.profile_pic, (err) => {
            User.findByIdAndDelete({_id:req.params.id}).lean().exec()
          });
    } else{
         return res.send("invalid user id")
    } 
    
    
    return res.status(200).send(user)
    }catch(err){
        console.log(err.message)
        return res.status(400).send(err.message)
    }
})

module.exports=router;