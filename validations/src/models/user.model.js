
const mongoose=require("mongoose")
const userSchema=new mongoose.Schema(
{
    first_name: { type: String, required: true },
    last_name: { type: String, required: true},
    email:{ type: String, required: true, unique: true },
    pincode: { type: Number, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true ,enum:["male" ,"female","others"]},
   
},
{
    timestamps:true,
    versionKey:false,
}

)

module.exports=mongoose.model("user",userSchema)