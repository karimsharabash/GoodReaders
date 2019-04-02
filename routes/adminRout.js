const express = require('express');
const router = express.Router();
const publicPath = require("../public/Path");
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
           res.send("/admin/getProfile");
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
    res.sendFile(publicPath+"/adminLoginPage.html");
})

router.get("/getProfile",(req,res)=>{
    res.sendFile(publicPath+"/homePageAdmin.html");
})

module.exports=router;