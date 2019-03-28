const express = require('express');
const reviewModel = require("../models/Review")
const router = express.Router();

router.get("/:id" , (req,res)=>
{
    console.log('hey')
    const bookID = req.params.id;
    reviewModel.find( {bookId :  bookID} )
    .populate('userId' , "username")
    .exec( (err, reviews) =>
    {
        res.send(reviews)
    })
})



router.post("/" , (req, res)=>
{
    const newReview = req.body ;
    const Review = new reviewModel(newReview);
 
    Review.save()
    .then( () =>
    {
     res.send("done");
    })

})

module.exports = router;