
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    username :{
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true
        // match: /^\w+\@\w+\.\w{2,3}/
    },
    password: {
        type: String,
        required: true
    },
    imageName: {
        type:String 
    },
    books: [{
        book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Books' },
        rating: {type:Number,default:0},
        status: { type: String, enum: ['read', 'reading', 'wantToRead'] }
    }]

});



const userModel = mongoose.model('User', userSchema);
module.exports = userModel;