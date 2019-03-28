

const mongoose  = require('mongoose');
const reviewSchema = mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bookId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Books' },
    content : {
        type : String,
        required : true
    },
    time : { type : Date, default: Date.now }
});

module.exports = mongoose.model('reviews',reviewSchema);