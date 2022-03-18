const app = require("./index");

const connect = require("./configs/db");

app.listen(4100,async()=>{
    try{
     await connect()
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }

    console.log("listening to port 4100")
})