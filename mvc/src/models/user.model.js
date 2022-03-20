const mongoose= require("mongoose");

const userSchema= new mongoose.Schema(
    {
        firstname:{type: String, required: true},
         lastname:{type: String, required: true}, 
         gender:{type: String, required: true},
        dateOfbirth:{type:String, required: true},
        type : {type:String,required:true,enum:["student", "admin" ,"instructor"]}
    },
    {
        timestamps:true,
        versionKey:false,

    }
);

const User=mongoose.model("user",userSchema);
module.exports=User;