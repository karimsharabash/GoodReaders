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