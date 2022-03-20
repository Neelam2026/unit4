const app=require("./index")
const connect=require("./config/db")
app.listen(8003,async()=>{
    try{
        await connect();
    }
    catch(err){
        console.log(err)
    }

    console.log("listening port 8003")
})