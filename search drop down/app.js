var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose  = require("mongoose");
var Book = require("./Book.model");

///////////////////////////////////////////////////////////////////////////////////////////////////////
port  = 8080;
app.listen(port,()=>{console.log("The app is listening on port: "+ port)});
var db = 'mongodb://localhost/example';
mongoose.connect(db);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
///////////////////////////////////////////////////////////////////////////////////////////////////


/*        He will retrieve all the boxes if the input field null  */


app.get("/books",(req,res)=>{
    Book.find({})
    .exec((err,books)=>{
        if(err){
            res.send("Errorrrrrrrrr");
        }
        else{
            console.log(books);
            res.setHeader('Access-Control-Allow-Origin', '*');    // very important to handle different routes
            res.send(books);
                }
    })

    
});

///////////////////////////////////////////////////////////////////////////////////////////////////
/*        He will retrieve all the books  that contains the written pattern   */


app.get("/book/:word",(req,res)=>{
   
    Book.find(       
       
        {title:{ "$regex": req.params.word, "$options": "i" }}
    )
    .exec(function(err,books){
        if(err){
            res.send("erro2222");
        }
        else{
            res.setHeader('Access-Control-Allow-Origin', '*');              // very important
            res.send(books)
        }
    })
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
