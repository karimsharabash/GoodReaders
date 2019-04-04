const express = require('express');
const postModel = require("../models/posts")
const router = express.Router();

router.post("/" , (req, res)=>
{
    const newPost = req.body ;
    const Post = new postModel(newPost);
 
    Post.save()
    .then( () =>
    {
     res.send("done");
    })

})

router.get("/",(req,res)=>
{
  
    postModel.find()
    .sort({time : -1})
    .limit(10)
    .exec( (err,data)=>{
        console.log(data)
    
    });
})

module.exports = router;