const express = require('express');
const router = express.Router();
router.post("/login", (req,res) =>
{
   const adminData = req.body;

    console.log("hyy")
    console.log(req.body)
   if(adminData.name == "admin")
   {
       if( adminData.password == "admin")
       {
           console.log("admin logged in");
           res.send("/homePageAdmin.html");
       }
       else{
        console.log("wrong passward");
        res.send("not the valid admin");
       }
   }
   else{
    console.log("wrong username for admin ");
   res.send("not the valid admin")       
   }
})
// router.get("/", (req ,res) =>
// {
//     console.log("hello");
// })


router.get("/login",(req,res)=>{
    res.redirect("/adminLoginPage.html");
 
})


module.exports=router;