const express = require('express');
const path=require('path');
const router = express.Router();
//const pathToHtml="/media/karim/Courses/ITI/Node JS/Rahma/GoodReaders/public"
router.post("/login", (req,res) =>
{
   const adminData = req.body;

    console.log(req.header);
    console,log(req.body)
   if(adminData.name == "admin")
   {
       if( adminData.password == "admin")
       {
           console.log("admin logged in");
           res.send("you logged in");
       }
       else{
        console.log("wrong passward");
        res.send("wrong passward");
            
       }
   }
   else{
    console.log("wrong username for admin ");
   res.end("ended")       
   }
})

router.get("/", (req ,res) =>
{
    console.log("hello rahoma");
})

// app.use(express.static(path.join(pathToHtml, 'public')));
router.get("/login",(req,res)=>{
    res.redirect("/adminLoginPage.html");
    
    // res.sendFile(path.join(pathToHtml+"/js/loginPageAdmin.js"))

})

// router.get("css/bootstrap.min.css",(req,res)=>{
//     res.sendFile(path.join(pathToHtml+"/public/css/adminLogin.css"));
    
//     // res.sendFile(path.join(pathToHtml+"/js/loginPageAdmin.js"))

// })

module.exports=router;
