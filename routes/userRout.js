const express = require('express');
const userModel = require("../models/Users");
const router = express.Router();
const bcrypt = require('bcrypt'); // tool to encrypt passwords

const multer = require('multer');
const storage = multer.diskStorage({
  destination: './public/img',
  filename: function (req, file, cb) {
  
      cb(null, file.originalname );
  }
});

const upload = multer({storage : storage });

router.post("/login", (req, res) => {
  const userData = req.body;

  console.log(userData);

  userModel.findOne({ username: userData.username }, (err, data) => {
    if (err) throw err;
    console.log(data);
    if (data == null) res.send("invalid");
    else {
         bcrypt.compare(userData.password, data.password)
        .then((result) => {
          console.log(result);
          if (result) {
            res.send("valid") //redirect
            console.log("succeed")
          }
          else {
            res.send("wrongPassword");
            console.log("faild")
          }

        })
    }
  })
})


router.post("/signup/checkUsername", (req, res) => {
  const Username = req.body.username;
  console.log(Username);
  userModel.findOne({ username: Username }, (err, data) => {
    console.log(data);
    if (data) res.send("invalid");
    else res.send("valid");
  })
})


router.post("/signup", (req, res) => {

  const newUser = req.body;
  console.log(newUser);
  bcrypt.hash(newUser.password, 10)
    .then((hashedPassword) => {
      newUser.password = hashedPassword;
      const user = new userModel(newUser);
      user.save()
        .then(() => {
          res.send("done");
        })
    })

})

router.post("/image" ,  upload.single('photo'), (req,res) =>{
 console.log(req.file);
  if(req.file) {
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


router.delete("/",(req,res)=>
{
 //  let idToDelete = req.params.id;
   
    userModel.deleteMany()
    .then( ()=>
    {
        res.send("all users  deleted"); 
    })
})

module.exports = router;