const app=require("./index");
const connect=require("./configs/db");

app.listen(5000,async(req,res)=>{
   try{
       await connect()
   }
   catch(e){
       console.log(e)
   }
   console.log("listening on port 5000")
})