const express = require('express');
const bookModel = require("../models/Book");
const router = express.Router();

router.post("/", (req,res) =>
{
  const book = new bookModel({
  	name : req.body.name,
  	avgRating: req.body.avgRating,
  	ratingCount:req.body.ratingCount,
  	photoName:req.body.photoName

  });
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


module.exports = router;