const mongoose=require("mongoose")

const connect=()=>{
    return mongoose.connect("mongodb+srv://Neelam0101:Dp20261996@cluster0.yca2t.mongodb.net/mvc")
}

module.exports=connect;