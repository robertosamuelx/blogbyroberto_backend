const Post = require('../models/Post');

module.exports = {
    async create(req, res) {
        const post = await Post.create(req.body);
        const now = Date.now();
        console.log(`${now} -'a new post ${post.id}`);
        return res.json(post);
    },

    async list(req, res) {
        const all = await Post.find({});
        return res.json(all);
    },

    async update(req, res) {
        const {id, howManyLiked} = req.body;
        const now = Date.now();
        const updated = await Post.findByIdAndUpdate(id, {howManyLiked: howManyLiked});
        console.log(`${now} - the post ${id} has been updated with ${howManyLiked} likes`);
        return res.json(updated);
    },

    async delete(req, res){
        const {id} = req.body;
        const response = await Post.findByIdAndRemove(id);
        const now = Date.now();
        console.log(`${now} - the post ${id} has been deleted`);
        return res.json(response);
    }
}