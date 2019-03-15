const express = require("express");
const mongoose = require("mongoose");
const adminRout = require("./routes/adminRout");
const categoryRout = require("./routes/categRout");
const userRout = require("./routes/userRout");
const bookRout = require("./routes/bookRout");
const authorRout = require("./routes/authorRout");
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/bookDB', () => {
    console.log("connected to database");
})



const app = express();
app.use(express.static('public'));
app.use(cors());
app.use(express.urlencoded());
app.use(express.json({
    type: ['application/json', 'text/plain']
  }));

app.use("/admin", adminRout);
app.use("/category", categoryRout);
app.use("/book", bookRout);
app.use("/user", userRout);
app.use("/author", authorRout);



app.listen(3000);
