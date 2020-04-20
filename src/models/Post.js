const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    text: String,
    howManyLiked: Number,
    postedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Post",PostSchema);