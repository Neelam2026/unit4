const express = require("express")
const router = express.Router();
const Product=require("../models/product.model");
const authenticate = require("../middleware/authenticate")


router.post("",authenticate, async (req, res)=>{
try{
 const product=await Product.create(req.body)
 return res.status(200).send(product)
}
catch(err){
    return res.status(400).send({message : err.message})  
}
});

router.get("", async (req, res) => {
    try{
        const product = await Product.find().populate({path:"user_id", select:"name"})
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
})


router.get("/:id",authenticate,async(req,res)=>{
    try{
  const  product=await Product.findById(req.params.id).populate("user_id").lean().exec();
  return res.status(200).send(product)
    }
    catch(err){
      return res.status(500).send({message:err.message})
    }
  
  })

router.patch("/:id",authenticate, async (req, res) => {
    try {
      const  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
      //.populate({path:"user_id", select:{email:1,password:1}}).exec();
     
      return res.status(200).send(product);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

  router.delete("/:id",authenticate,async(req,res)=>{
    try{
      const product=await Product.findByIdAndDelete(req.params.id).lean().exec();
      return res.status(200).send(product)
    }
    catch(err){
      return res.status(500).send({message:err.message})
    }
    
  })


module.exports = router;


