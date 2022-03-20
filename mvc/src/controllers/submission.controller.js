const express = require("express")
const router = express.Router()
const Submissions = require("../models/submission.model")
 router.get("",async(req,res)=>{
    try{
       const data = await Submissions.find().lean().exec()
       return res.send(data)
    }catch(err){
        console.log(err.message)
        return res.send(err.message)
    }
})
 router.get("/:id",async(req,res)=>{
  try{
     const data = await Submissions.find({evaluationid:req.params.id},{_id:0,evaluationid:0,marks:0,__v:0}).lean().exec()
     return res.send(data)
  }catch(err){
      console.log(err.message)
      return res.send(err.message)
  }
})
 router.get("/highest/find",async(req,res)=>{
  try{

     const data = await Submissions.findOne().populate("studentid").sort({marks:-1}).lean().exec()
     return res.send(data)
  }catch(err){
      console.log(err.message)
      return res.send(err.message)
  }
})
 router.post("",async(req,res)=>{
  try{
    const data = await Submissions.create(req.body)
    return res.send(data)
  }
  catch(err){
      return res.send(err.message)
  }
})
module.exports =  router