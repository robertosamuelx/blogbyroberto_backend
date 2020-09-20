const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    text: String,
    howManyLiked: Number,
    isVideo: Boolean,
    postedAt: Date,
    awsKey: String,
    url: String
});

module.exports = mongoose.model("Post",PostSchema);