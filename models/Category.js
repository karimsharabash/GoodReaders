

const mongoose  = require('mongoose');
const CategorySchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    }
});
const categoryModel = mongoose.model('Categories',CategorySchema);
 module.exports = categoryModel ;
