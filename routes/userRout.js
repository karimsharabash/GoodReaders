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
            req.session.user =  data;
            console.log("succeed")           
            res.send("userProfile.html");
          }
          else {
            res.send("wrongPassword");
            console.log("faild")
          }

        })
    }
  })
})


//route for the navbar
router.get("/nav/defineUser" , (req,res)=>
{

  userModel.findOne({_id:req.session.user._id} , (err,data)=>
  {
    res.json(data);
  })
})


router.post("/signup/checkUsername", (req, res) => {
  const Username = req.body.username;
  console.log(Username);
  userModel.findOne({ username: Username }, (err, data) => {
    if (data) res.send("invalid");
    else res.send("valid");
  })
})


router.post("/signup", (req, res) => {

  const newUser = req.body;
  console.log("this will save in DB ");
  // console.log(newUser );

  bcrypt.hash(newUser.password, 10)
    .then((hashedPassword) => {
      newUser.password = hashedPassword;
      const user = new userModel(newUser);
      user.save()
        .then(() => {
         
          req.session.user =  newUser;
          console.log(req.session.user)
           res.send("userProfile.html");
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