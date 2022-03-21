const express = require("express");

const router=express.Router()
const Gallary=require("../models/gallary.model")
const upload=require("../middleware/upload")
router.post("", upload.any("profile_pic",5), async (req, res) => {
    try {
      const filePaths = req.files.map((file) => {
        return file.path;
      });
      if(findById({__id:req.body.userid})){
        const gallery= await Gallery.findByIdAndUpdate({__id:req.body.userid},{set:{profile_pic:req.file.path}})
          }
          else{
            const gallery = await Gallery.create({
              first_name:req.body.first_name,
              last_name:req.body.last_name,
              profile_pic: filePaths,
            });
          }
     
  
      return res.status(200).send(gallery);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });


  router.get("", async (req, res) => {
    try {
      const gallery = await Gallery.find().lean().exec();
  
      return res.status(200).send(gallery);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

  module.exports = router;