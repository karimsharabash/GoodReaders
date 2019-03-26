const express = require('express');
const categoryModel = require("../models/Category");
const router = express.Router();

router.post("/", (req,res) =>
{
  const newCat = req.body;
  const category = new categoryModel(newCat);
  category.save()
  .then( () =>
  {
   res.send("done");
  })
})


router.get("/",(req,res)=>
{
    categoryModel.find((err, allCategories)=>{
        if(err) throw err ;
        res.send(allCategories);

        })


})


router.get("/:id",(req,res)=>
{
   categoryModel.findOne({_id:req.params.id})
    .then((data) =>
    { 
        res.send(data); 
    })
})

router.put("/:id",(req,res)=>
{
   let idToUpdate = req.params.id;
   let updatedCat = req.body;
   categoryModel.updateOne({_id:idToUpdate},updatedCat)
    .then(() =>
    { 
        res.send("category updated "); 
    })
})

router.delete("/:id",(req,res)=>
{
   let idToDelete = req.params.id;
   
    categoryModel.deleteOne({_id:idToDelete})
    .then( ()=>
    {
        res.send("category deleted"); 
    })
})


module.exports = router;