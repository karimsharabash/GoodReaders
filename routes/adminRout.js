const express = require('express');
const path=require('path');
const router = express.Router();
const pathToHtml="/run/media/rahmafaisal/01D48FB4035C68A0/iti/NodeJsProject/GoodReaders/GoodReaders/public"
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
           res.redirect("/homePageAdmin.html");
           console.log("admin logged in");
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

router.post('/addnewcat',(req,res)=>{
    console.log(req.body)
     let data={"he":"hyy"}
     res.set('Content-Type', 'application/json');
     res.send({ hello: 'world' });
    
    
})

router.get('/allCatygory',(req,res)=>{
    res.set('Content-Type', 'application/json');
     res.send([{'name':'rahma','id':"rahma"}]);
})

router.delete('/deleteCat/:id',(req,res)=>{
    console.log("hey")
    const idtodelete = req.params.id;
    console.log(idtodelete);
    res.set('Content-Type', 'application/json');
     res.send({ hello: 'world' });
})

module.exports=router;