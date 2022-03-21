const app=require("./index");
const connect=require("./configs/db");

app.listen(4300,async(req,res)=>{
   try{
       await connect()
   }
   catch(e){
       console.log(e)
   }
   console.log("listening on port 4300")
})