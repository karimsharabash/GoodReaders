const express = require('express');
const authorModel = require("../models/Author");
const router = express.Router();
const publicPath = require("../public/Path");

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

//routes has been changed by rahma to / and /author

router.get("/",(req,res)=>
{
   
    res.sendFile(publicPath+"/authors.html");

})

router.get("/Author",(req,res)=>
{
    
    authorModel.find(  (err, allAuthors)=>{
        if(err) throw err ;
       
        res.send(allAuthors);
        })

})

//route add by rahma to get one author


router.get("/single/Author",(req,res)=>
{
  
 res.sendFile(publicPath+"/authorProfile.html");

 
  
})

router.get("/single/Author/:id",(req,res)=>
{
  
 req.session.authorId=req.params.id
 res.send("ok")
  
})

router.get("/authorInfo",(req,res)=>
{
    
   authorModel.findOne({_id:req.session.authorId})
    .then((data) =>
    { 
        res.send(data)
        

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