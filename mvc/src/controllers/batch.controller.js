const express = require("express");
const router = express.Router();
const Batch=require("../models/batch.model")

router.get("",async(req,res)=>{
    try{
       const data = await Batch.find().populate("studentid").lean().exec()
       return res.send(data)
    }catch(err){
        console.log(err.message)
        return res.send(err.message)
    }
})
router.post("",async(req,res)=>{
  try{
    const data = await Batch.create(req.body)
    return res.send(data)
  }
  catch(err){
      return res.send(err.message)
  }
})
module.exports = router