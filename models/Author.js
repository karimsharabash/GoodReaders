

const mongoose  = require('mongoose');
const authorSchema = mongoose.Schema({
   
    first_name:{
        type:String,
        require:true
    },
    last_name:{
        type:String,
        required:true
    },
    dateOfBirth:{
        type:Date,
        required:true
    },
    photoName:{
        type:String,
    }


});

const authorModel = mongoose.model('Authors',authorSchema);
module.exports = authorModel
