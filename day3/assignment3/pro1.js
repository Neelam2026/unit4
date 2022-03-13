const express=require("express");
const app=express();

app.get("/books",allBooks,(req,res)=>{
  return res.send({ route: "/books" })
})

function allBooks(req,res,next){
  console.log("Fetching all books")
  next()
}

app.get("/book/:name",singleBook ,(req,res)=>{
   return res.send({bookName:req.name})
})

function singleBook(req,res,next){
  console.log(req.params.name)
  req.name=req.params.name;
  next()
}


app.listen(3001,()=>{
    console.log("listening port 3001")
})