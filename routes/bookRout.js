const express = require('express');
const bookModel = require("../models/Book");
const router = express.Router();

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

router.get("/",(req,res)=>
{
    bookModel.find({},(err, books)=>{
    if(err) return res.send(err) ;
        //res.set("content-type","application/json");
    	res.send(books);
    })
})

router.get("/singleBook",(req,res)=>
{
    bookModel.findOne({_id:"5c8d72bb0806621ec3a77c2d"},(err, Book)=>{
    if(err) return res.send(err) ;

    console.log(Book)
        //res.set("content-type","application/json");
    	res.json(Book);
    })
})


//route add by rahma to get all books of a certain user ;
router.get("/author/:id",(req,res)=>{
   bookModel.find({authorId:req.params.id},(req,res)=>{
       res.send(res);
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