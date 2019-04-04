const express = require("express");
const mongoose = require("mongoose");
const adminRout = require("./routes/adminRout");
const categoryRout = require("./routes/categRout");
const userRout = require("./routes/userRout");
const bookRout = require("./routes/bookRout");
const authorRout = require("./routes/authorRout");
const reviewRout = require("./routes/reviewRout");
const cors = require('cors');
const path = require("path");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const publicPath = require("./public/Path");
const MongoStore = require('connect-mongo')(session);
const postModel = require("./models/posts")
mongoose.connect('mongodb://localhost:27017/bookDB', () => {
    console.log("connected to database");
})



const app = express();
const server = require('http').Server(app);

const io = require('socket.io')(server);
app.use(express.static(path.join(__dirname, 'public')));
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
    // cookie: {
    //   // expires: 600000
    //  maxAge: 1000 * 60 * 60 * 24  //month
    // },
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 24 * 60 * 60 // Keeps session open for 1 day
    })
}));



//app.use(sessionChecker());
/*end of session code */
app.use("/admin", adminRout);
app.use("/category", categoryRout);
app.use("/user", userRout);
app.use("/book", bookRout)
app.use("/author", authorRout);
app.use("/review", reviewRout)

app.get('/home', (req, res) => {
    if (req.session.user == undefined)
        res.sendFile(publicPath + "/home.html")
    else
        res.sendFile(publicPath + "/userProfile.html");
})


let clients = {};
io.on('connection', (socket) => {

    console.log('connect');

    io.to(socket.id).emit('addUsers', clients);

    socket.on('disconnect', () => {
        console.log("a user disconnected !!!");
        delete clients[socket.id]
        socket.broadcast.emit('addUsers', clients);
    });

    socket.on('send', () => {

        // console.log(socket.handshake)
        // console.log(post)
        console.log("new post pushed")
        socket.broadcast.emit("newReview");


    })

});

server.listen(3000);
