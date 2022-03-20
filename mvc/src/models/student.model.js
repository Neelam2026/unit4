const mongoose=require("mongoose")

const studentSchema=new mongoose.Schema({
    rollId:{type: String, required: true},
    currentbatch:{type: String, required: true},
    
},
{
    timestamps:true,
    versionKey:false,  
}
);

module.exports=mongoose.model("student",studentSchema)