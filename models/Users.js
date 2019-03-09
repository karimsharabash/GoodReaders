/*

const mongoose  = require('mongoose');
const userSchema = mongoose.Schema({
    first_name:{
        type: String,
        unique: true,
        require: true
    },
    last_name:{
        type: String,
        require: true
    },
    email:{
        type:String,
        require:true,
        match:/^\w+\@\w+\.\w{2,3}/
    },
    password:{
        type:String,
        required:true
    },
    books:[{
        book_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Books'},
        rating:Number,  
        shelve:{type:String, enum: ['read', 'reading','wantToRead']}
 

});



const userModel = mongoose.model('User',userSchema);
module.exports = userModel;
*/