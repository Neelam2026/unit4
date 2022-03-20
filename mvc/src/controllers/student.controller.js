const express=require("express");
const router=express.Router();

const Student=require("../models/student.model");


router.get("" ,async(req,res)=>{
    try{
     const students=await Student.find()
      
      .lean()
      .exec();

    return res.status(200).send(students);
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
} );


router.post("", async (req, res) => {
    try {
      const student = await Student.create(req.body);
      return res.status(201).send(student );
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  



  module.exports=router;