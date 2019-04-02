// nav route has been modified 

const publicPath = require("../public/Path");
const express = require('express');
const userModel = require("../models/Users");
const bookModel = require("../models/Book")
const router = express.Router();
const bcrypt = require('bcrypt'); // tool to encrypt passwords

const multer = require('multer');
const storage = multer.diskStorage({
  destination: './public/img',
  filename: function (req, file, cb) {

    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });


router.post("/login", (req, res) => {
  const userData = req.body;

  console.log(userData);

  userModel.findOne({ username: userData.username }, (err, data) => {
    if (err) throw err;

    if (data == null) res.send("invalid");
    else {
      bcrypt.compare(userData.password, data.password)
        .then((result) => {
          console.log(result);
          if (result) {
            if (!userData.remember){
              req.session.cookie.expires = false;
          }
          else {
            req.session.cookie.maxAge = 2628000000; // for one month.
          }
          req.session.user = data;
          res.send("userProfile.html");
        
         } else {
            res.send("wrongPassword");
          }

        })
}
  })
})

router.get("/logout", (req,res) =>
{
  req.session.destroy();
})

// new route for getting htmlpage of User
router.get("/current/User",(req,res)=>
{
    res.sendFile(publicPath+"/userProfile.html");    
})

//route for the navbar
router.get("/nav/defineUser", (req, res) => {
 
 
  // 
  // "5c8d581db112790d77f9fe3a"
  if(req.session.user==undefined)
  {res.send({"res":"no user found"})}
  else
  {
  userModel.findOne({ _id: req.session.user._id })
  .populate('books.book_id')
  .exec((err,data)=>{
       res.json(data)
  })}
})


router.post("/signup/checkUsername", (req, res) => {
  const Username = req.body.username;
  userModel.findOne({ username: Username }, (err, data) => {
    if (data) res.send("invalid");
    else res.send("valid");
  })
})


router.post("/signup", (req, res) => {

  const newUser = req.body;
  bcrypt.hash(newUser.password, 10)
    .then((hashedPassword) => {
      newUser.password = hashedPassword;
      const user = new userModel(newUser);
      user.save()
        .then(() => {

          req.session.user = newUser;
          req.session.cookie.expires = false; //make it one time session
          res.send("userProfile.html");
        })
    })

})

router.post("/image", upload.single('photo'), (req, res) => {
  
  if (req.file) {
    console.log("image came");
    res.send("done");
  }
  else res.send("failed");

})

router.get("/", (req, res) => {
  userModel.find((err, allUser) => {
    if (err) throw err;
    res.send(allUser);
  })
})


router.delete("/:id", (req, res) => {
   let idToDelete = req.params.id;

  userModel.deleteOne({_id:idToDelete})
    .then(() => {
      res.send("all users  deleted");
    })
})


//add new book to user bookList
router.post("/:id/book", (req, res) => {
  let idToUpdate = req.params.id;
  let addedBook = req.body;
  //to only get the array of book not all the user document
  userModel.findOne({ _id: idToUpdate }, "books" ,(err, user) => {
    user.books.push(addedBook);
    user.save(); //to update the user
    res.send("done");
  })
})

//check if this book already exist in this user bookList
router.get("/:userId/book/:bookId" ,(req,res) =>
{
  
  const idToUpdate = req.params.userId;
  const bookId = req.params.bookId;
    console.log ("book id "+ bookId +"  userid "+idToUpdate)
  userModel.findOne({ _id: idToUpdate , "books.book_id" : bookId }, { "_id" : 1, "books" : 1,"username":1} ,(err, user) => {
    console.log(user);  
    if(user)  // if user is found then there is a relation between this user and this book 
       {
        const currentBook = user.books.find(function(element) { 
        return element.book_id==bookId; 
      }); 
      console.log(currentBook);
      res.json(currentBook);
    } 
    else 
    {
      console.log("not found relation");
      res.json("not found");
    }
  }) 
})


//modify this book data in this user bookList
router.put("/:userId/book/:bookId" ,(req,res) =>
{
  const idToUpdate = req.params.userId;
  const BookIdToUpdate = req.params.bookId; 
  const updatedBook =req.body
  userModel.findOne({ _id: idToUpdate , "books.book_id" : BookIdToUpdate }, { "_id" : 1, "books" : 1,"username":1} ,(err, user) => {
    if(err) throw err;
    for (book of user.books)
    {
      if(book.book_id == BookIdToUpdate)
      {
        if(updatedBook.status != " ")
        {
          book.status = updatedBook.status;
        }else {
          book.rating = updatedBook.rating;
        }
      }
    }
    console.log(user)
     user.save();
    res.send("done");

  })
})

router.get("/popular", (req,res)=>
{
  bookModel.find()
  .sort({avgRating :-1 })
  .limit(5)
  .exec( (err,books) =>
  {
    res.send(books)
  })
})


router.get("/:id", (req, res) => {
  userModel.findOne({_id:req.params.id},(err, user) => {
    if (err) throw err;
    res.send(user);
  })
})

module.exports = router;
