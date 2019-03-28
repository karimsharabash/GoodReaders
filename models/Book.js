

const mongoose  = require('mongoose');
const bookSchema = mongoose.Schema({
    name:{
        type:String,
        require:true            
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Categories",
        required:true
    },
    authorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Authers",
        required:true
    },
    avgRating:{type:Number,default:0},         
    ratingCount:{type:Number,default:0},
    photoName:{
        type:String,
    },
    description:{
        type:String,
    }

});
const bookModel = mongoose.model('Books',bookSchema);
module.exports = bookModel; 
