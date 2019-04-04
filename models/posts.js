const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    postContent: {
        type: String
    },
    user :{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    time : { type : Date, default: Date.now }
    });

    var Post = mongoose.model("Post", postSchema);
    module.exports = Post;