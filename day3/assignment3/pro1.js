const express=require("express");
const app=express();

app.get("/books" ,allbooksName(["gameofthrones" ,"harrypotter"]),(req,res)=>{
   return res.send({bookName:req.name})
})
function allbooksName(book){
return function allbooks(req,res,next){
   console.log("Fetching all books")
    for( i=0;i<book.length;i++){
    if(book[i]==="gameofthrones" || book[i]==="harrypotter"){
         req.name=book[i]
   
        return next() 
    }
    else{

    }
  }
 
}
}
app.listen(3001,()=>{
    console.log("listening port 3001")
})