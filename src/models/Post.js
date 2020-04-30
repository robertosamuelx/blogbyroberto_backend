const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    text: String,
    howManyLiked: Number,
    isVideo: Boolean,
    postedAt: Date
});

module.exports = mongoose.model("Post",PostSchema);