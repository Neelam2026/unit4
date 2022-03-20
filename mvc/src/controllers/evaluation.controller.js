const express = require("express");
const router = express.Router();
const Evaluation=require("../models/evaluation.model")

router.get("",async(req,res)=>{
    try{
       const data = await Evaluation.find().lean().exec()
       return res.send(data)
    }catch(err){
        console.log(err.message)
        return res.send(err.message)
    }
})
router.post("",async(req,res)=>{
  try{
    const data = await Evaluation.create(req.body)
    return res.send(data)
  }
  catch(err){
      return res.send(err.message)
  }
})
module.exports = router