const express = require('express');
const userModel = require("../models/Users");
const router = express.Router();

router.post("/login", (req,res) =>
{
  const userData = req.body;

  console.log(userData);

  let response = { check : true};

//   res.set("content-type", "application/json");
  res.send("accept");
  
})



module.exports = router;