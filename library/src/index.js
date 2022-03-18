const express=require("express");
const mongoose=require("mongoose");


const app=express();
module.exports = app;
app.use(express.json())

// Section SCHEMA //independent
const sectionSchema=new mongoose.Schema(
    {
        section_name: { type: String, required: true },
    },
    {
        timestamps:true,
        versionKey:false
    },
    );
const Section=mongoose.model("section",sectionSchema)

// AUTHOR SCHEMA
const authorSchema= new mongoose.Schema(
    {
       first_name:{type:String,required:true},
       last_name:{type:String,required:false},
    },
    {
     timestamps:true, 
     versionKey:false,  
    }
    );
const Author=mongoose.model("author",authorSchema)



// books schema  //need sectionId
const bookSchema=new mongoose.Schema(
    {
      name:{type:String,required:true},
      body:{ type: String, required: true},
      sectionId:{type:mongoose.Schema.Types.ObjectId,ref:"section",required:true},
      
    },
    {
        versionKey:false,  
        timestamps:true,
    },
    );
const Book=mongoose.model("book",bookSchema)

//bookauthor schema//book id//author id
const bookauthorSchema=new mongoose.Schema(
  {
    book_id:{type:mongoose.Schema.Types.ObjectId,ref:"book",required:true},
    author_id:{type:mongoose.Schema.Types.ObjectId,ref:"author",required:true},

  },
  {
      versionKey:false,  
      timestamps:true,
  },
  );
const BookAuthor=mongoose.model("bookauthor", bookauthorSchema)

//section CRUD

app.post("/sections" ,async (req, res) => {
  try {
    const section = await Section.create(req.body);

    return res.status(201).send({section:section});
  } catch (err) {
    return res.status(500).send({ message1: err.message });
  }
});


app.get("/sections", async (req, res) => {
    try {
      const sections = await Section.find().lean().exec();
      return res.status(200).send({sections: sections}); // []
    } catch (err) {
      return res
        .status(500)
        .send({ message: err.message });
    }
  });
  
 
  
  app.get("/sections/:id",async(req,res)=>{
    try{
  const  section=await Section.findById(req.params.id).lean().exec();
  return res.status(200).send({section: section})
    }
    catch(err){
      return res.status(500).send({message:err.message})
    }
  
  })
  
  
  app.patch("/sections/:id", async (req, res) => {
    try {
      const  section = await Section.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
     
      return res.status(200).send({section: section});
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
  app.delete("/sections/:id",async(req,res)=>{
    try{
      const section=await Section.findByIdAndDelete(req.params.id).lean().exec();
      return res.status(200).send({section: section})
    }
    catch(err){
      return res.status(500).send({message:err.message})
    }
    
  })

  //authors CRUD
app.get("/authors", async (req, res) => {
    try {
      const authors = await Author.find().lean().exec();
      return res.status(200).send({authors:authors}); // []
    } catch (err) {
      return res
        .status(500)
        .send({ message: err.message });
    }
  });
  
  app.post("/authors" ,async (req, res) => {
    try {
      const author = await Author.create(req.body);
  
      return res.status(201).send({author:author});
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
  app.get("/authors/:id",async(req,res)=>{
    try{
  const  author=await Author.findById(req.params.id).lean().exec();
  return res.status(200).send({author: author})
    }
    catch(err){
      return res.status(500).send({message:err.message})
    }
  
  })
  
  
  app.patch("/authors/:id", async (req, res) => {
    try {
      const  author = await Author.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
     
      return res.status(200).send({author: author});
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
  app.delete("/authors/:id",async(req,res)=>{
    try{
      const author=await Author.findByIdAndDelete(req.params.id).lean().exec();
      return res.status(200).send({author: author})
    }
    catch(err){
      return res.status(500).send({message:err.message})
    }
    
  })
  
 //books CRUD
 app.get("/books", async (req, res) => {
    try {
      const books = await Book.find().populate({path:"sectionId", select:"section_name"}).lean().exec();
      return res.status(200).send({books:books}); // []
    } catch (err) {
      return res
        .status(500)
        .send({ message: err.message });
    }
  });
  
  app.post("/books" ,async (req, res) => {
    try {
      const book = await Book.create(req.body);
  
      return res.status(201).send({book:book});
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
  app.get("/books/:id",async(req,res)=>{
    try{
  const  book=await Book.findById(req.params.id).populate({path:"sectionId", select:"section_name"}).lean().exec();
  return res.status(200).send({book:book})
    }
    catch(err){
      return res.status(500).send({message:err.message})
    }
  
  })
  
  
  app.patch("/books/:id", async (req, res) => {
    try {
      const  book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).populate({path:"sectionId", select:"section_name"})
        .lean()
        .exec();
     
      return res.status(200).send({book:book});
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
  app.delete("/books/:id",async(req,res)=>{
    try{
      const book=await Book.findByIdAndDelete(req.params.id).lean().exec();
      return res.status(200).send({book:book})
    }
    catch(err){
      return res.status(500).send({message:err.message})
    }
    
  })
  

  //bookauthors
  app.post("/bookauthors" ,async (req, res) => {
    try {
      const bookauthors = await BookAuthor.create(req.body);
  
      return res.status(201).send({bookauthors :bookauthors });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });


  app.get("/bookauthors", async (req, res) => {
    try {
      const bookauthors = await BookAuthor.find().populate({path:"author_id", select:{first_name:1,last_name:1}}).populate({path:"book_id", select:{name:1,body:1}, populate:{path:"sectionId",select:"section_name"},},).lean().exec();
      return res.status(200).send({bookauthors :bookauthors }); // []
    } catch (err) {
      return res
        .status(500)
        .send({ message: err.message });
    }
  });

  app.get("/bookauthors/:id",async(req,res)=>{
    try{
  const bookauthor=await BookAuthor.findById(req.params.id).populate({path:"author_id", select:{first_name:1,last_name:1}}).populate({path:"book_id", select:{name:1,body:1}, populate:{path:"sectionId",select:"section_name"},},).lean().exec();
  return res.status(200).send({bookauthor:bookauthor})
    }
    catch(err){
      return res.status(500).send({message:err.message})
    }
  
  })

app.patch("/bookauthors/:id", async (req, res) => {
    try {
      const bookauthor = await BookAuthor.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
     
      return res.status(200).send({bookauthor:bookauthor});
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

/****************************** */

const userSchema=mongoose.Schema(
{
name:{type:String,required:true},
bookId:{type:mongoose.Schema.Types.ObjectId, ref:"book",required:true},
checkOut:{type:String,default:null},
checkIn:{type:String,default:null},
},
)
 const User=mongoose.model("user",userSchema);

 app.post("/users" ,async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).send({user:user});
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

 app.get("/users",async(req,res)=>{
   try{
  const user=await User.find()
  .populate({path:"bookId",select:{name:1}})
  .lean().exec();

  return res.status(200).send({user: user});
   }
   catch(err){
     return res.status(500).send({message:err.message})
   }
 })
 

/****************************** */
