const mongoose= require("mongoose")


const submissionSchema=new mongoose.Schema(
{
    evaluationid:{
      
            type:mongoose.Schema.Types.ObjectId,
            ref:"evaluation",
            required:true,
         
       studentid:{
        
            type:mongoose.Schema.Types.ObjectId,
            ref:"student",
            required:true,
          
       },
       marks:{type:Number,required:true},
    }
},
{
    timestamps:true,
    versionKey:false,
},
);

module.exports=mongoose.model("submission",submissionSchema);