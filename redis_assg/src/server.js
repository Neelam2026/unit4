const connect=require("./config/db")
const app=require("./index")

app.listen(5060,async(req,res)=>{
    try{
       await connect();
    }
    catch(err){
        console.log(err)
    }
    console.log("listening on port 5060")

})