const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    text: String,
    howManyLiked: {
        type: Number,
        default: 0
    },
    isVideo: Boolean,
    postedAt: Date,
    awsKey: String,
    url: String,
    size: Number,
    fileName: String
});

module.exports = mongoose.model("Post",PostSchema);