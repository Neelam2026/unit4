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


router.patch("/:userId", upload.single("profile_pic"), async(req,res) => {
    try{
        // getting data inputted at frontend
        const data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            profile_pic: req.file.path
        }
        
        // getting user
        let user = await User.findById(req.params.userId);
        // getting path to the user profile pic
        let path = user.profile_pic;
        // deleting the previous user profile pic
        fs.unlinkSync(path.toString());

        // updating data in the database collection
        user = await User.findByIdAndUpdate(req.params.userId, data, {new: true});
        return res.status(200).send({user});
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.delete("/:userId", async(req,res) => {
    try {
        let user = await User.findById(req.params.userId);
        let path = user.profile_pic;
       fs.unlinkSync(path.toString());
        await User.findByIdAndDelete(req.params.userId);
        return res.status(200).send(user);
    } catch(err) {
        return res.status(500).send(err.message);
    }
})

module.exports = router;