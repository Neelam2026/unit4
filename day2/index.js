const express=require("express")

const app=express();

app.get("", (req,res) =>{
    res.send("Hello")
})

app.get("/books", (req,res) =>{
    res.send([
    {
        "title":"Data Analytics Made Accessible",
        "author":"A. Maheshwari",
        "description":"If you've just started to dip your toe in the industry, or if you're not quite sure what data analytics is—this one is for you. This book breaks down data analysis into an easy to follow, digestible format.",

    },
    {
        "title":"Too Big To Ignore: The Business Case for Big Data",
        "author":"P. Simon",
        "description":"If you're the type that's skeptical about business uses for big data, OR if you're intrigued by this concept and you can't get enough, this is the perfect big data book for either scenario",

    },
    {
        "title":"Big Data: A Revolution That Will Transform How We Live, Work, and Think",
        "author":"V. Mayer-Schönberger and K. Cukier",
        "description":"This one is great for the individual that may be seeking to find more great reasons why data analytics is important, and not just in a business sense.",

    },
    {
        "title":"Business UnIntelligence: Insight and Innovation Beyond Analytics and Big Data",
        "author":"B. Devlin",
        "description":"All seasoned business data analysts should take a peek at this read. For anyone that's been in the industry for long enough, this provides a different angle on big data and data analytics. ",

    },
])
})

app.listen(5000,()=>{
    console.log("listening port5000")
});