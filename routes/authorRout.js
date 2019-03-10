const express = require('express');
const authorModel = require("../models/Author");
const router = express.Router();


router.post("/", (req,res) =>
{
  const newAuthor = req.body;

  const author = new authorModel(newAuthor);
  author.save()
  .then( () =>
  {
   res.send("done");
  })
})


router.get("/",(req,res)=>
{
    authorModel.find(  (err, allAuthors)=>{
        if(err) throw err ;
        res.send(allAuthors);
        })


})

router.put("/:id",(req,res)=>
{
   let idToUpdate = req.params.id;
   let updatedAuthor = req.body;
   authorModel.updateOne({_id:idToUpdate},updatedAuthor)
    .then(() =>
    { 
        res.send("Author updated "); 
    })
})

router.delete("/:id",(req,res)=>
{
   let idToDelete = req.params.id;
   
   authorModel.deleteOne({_id:idToDelete})
    .then( ()=>
    {
        res.send("category delete"); 
    })
})
module.exports = router;