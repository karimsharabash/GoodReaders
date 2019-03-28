const express = require("express");
const mongoose = require("mongoose");
const adminRout = require("./routes/adminRout");
const categoryRout = require("./routes/categRout");
const userRout = require("./routes/userRout");
const bookRout = require("./routes/bookRout");
const authorRout = require("./routes/authorRout");
const reviewRout = require("./routes/reviewRout");
const cors = require('cors');
const path= require("path");
const  cookieParser = require('cookie-parser');
const session = require('express-session');
const publicPath = require("./public/Path");
mongoose.connect('mongodb://localhost:27017/bookDB', () => {
    console.log("connected to database");
})



const app = express();
app.use(express.static(path.join(__dirname,'public')));
app.use(cors());
app.use(express.urlencoded());
app.use(express.json({
    type: ['application/json', 'text/plain']
  }));

  /*code added by karim for session */


  app.use(cookieParser());

 /*

 resave : Forces the session to be saved back to the session store, 
 even if the session was never modified during the request
 
 cookie :The default value is { path: '/', httpOnly: true,
  secure: false, maxAge: null }.
 */
  app.use(session({
    key: 'user_sID',
    secret: 'fight-club',
    resave: true,
    saveUninitialized: false,
    cookie: {
      // expires: 600000
     maxAge: 1000 * 60 * 60 * 24  //month
    }
}));

/* This middleware will check if user's cookie is 
still saved in browser and user is not set,
 then automatically log the user out.
  This usually happens when you stop your express 
  server after login,your cookie still remains
   saved in the browser.
*/
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie('user_sID');        
  }
  next();
});

let sessionChecker = function ( req, res, next) {
  if ( req.session.user  &&  req.cookies.user_sid ) {
      res.redirect('home.html');
  } else {
      next(); // should handle all the un logged users 
  }    
};

//app.use(sessionChecker());
/*end of session code */ 
app.use("/admin", adminRout);
app.use("/category", categoryRout);
app.use("/user", userRout);
app.use("/book",bookRout)
app.use("/author", authorRout);
app.use("/review",reviewRout)
app.get('/home',(req,res)=>{
 
    res.sendFile(publicPath+"/home.html")
})
app.listen(3000);
