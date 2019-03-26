const express = require('express');
const bookModel = require("../models/Book");
const router = express.Router();
const publicPath = require("../public/Path");
router.post("/", (req,res) =>
{
  let newBook=req.body;
  const book = new bookModel(newBook);
  
  book.save()
  .then( () =>
  {
   res.send(book);
  })
})

router.get("/books",(req,res)=>
{
    bookModel.find({},(err, books)=>{
    if(err) return res.send(err) ;
        //res.set("content-type","application/json");
    	res.send(books);
    })
})

router.get("/",(req,res)=>
{       
        res.sendFile(publicPath+'/Allbooks.html') 
})

router.get("/singlebook",(req,res)=>
{       
        res.sendFile(publicPath+'/bookProfile.html') 
})

router.get("/singleBook",(req,res)=>
{
    bookModel.findOne({_id:"5c90d1326c4a64731afa2b27"},(err, Book)=>{
    if(err) return res.send(err) ;

   
        //res.set("content-type","application/json");
    	res.json(Book);
    })
})


//route add by rahma to get all books of a certain author ;
router.get("/author/:id",(req,res)=>{
   bookModel.find({authorId:req.params.id},(err,authorBooks)=>{
    if(err) return res.send(err) ;

    console.log(authorBooks)
    console.log("books are here")
        
    	res.send(authorBooks);
    //    res.send(res);
   })
})

router.delete("/:id",(req,res)=>
{
   let idToDelete = req.params.id;
   
   bookModel.deleteOne({_id:idToDelete})
    .then( ()=>
    {
        res.send("Book delete"); 
    })
})

router.put("/:id",(req,res)=>
{
    
    let idToUpdate = req.params.id;
   let updatedBOOK = req.body;
   bookModel.updateOne({_id:idToUpdate},updatedBOOK)
    .then(() =>
    { 
        res.send("book updated "); 
    })
})

module.exports = router;