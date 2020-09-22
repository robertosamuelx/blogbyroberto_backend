const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const credencial = {login: process.env.LOGIN_USER,password: process.env.PASSWORD_USER};
const token = jwt.sign(String(credencial),'shhhhh');
const Utils = require('../resources/Utils');
const aws = require('aws-sdk');
const s3 = new aws.S3();

module.exports = {
    async create(req, res) {
        console.log(String(req.headers.authorization));
        let json = {};
        if(token == String(req.headers.authorization)){
            const now = Date.now() - (1000*60*180);
            let body = req.body;
            console.log(body)
            if(body.isVideo){
                body.text = Utils.changeLink(body.text);
            }

            json = {...body,postedAt:now};
            
            if(req.file){
                const awsKey = req.file['key'];
                const url = req.file['location'];
                const size = req.file['size'];
                const fileName = req.file['originalname'];
                json = {...json,awsKey,url,size,fileName}
            }
            const post = await Post.create(json);
            console.log(`${now} -'a new post ${post.id}`);
            console.log(post);
            return res.status(201).json({id: post._id});
        }

        else {
            return res.status(403).json({response:'Login failed'});
        }
    },

    async list(req, res) {
        const { page = 1 } = req.query;
        const result = await Post.find().sort({postedAt: 'desc',test: 1}).skip((page - 1) * 5).limit(5);
        const count = await Post.countDocuments();
        res.setHeader('total',count);
        res.setHeader('page',page);
        return res.status(200).json(result);
    },

    async update(req, res) {
        const {id, howManyLiked} = req.body;
        const now = Date.now();
        const updated = await Post.findByIdAndUpdate(id, {howManyLiked: howManyLiked});
        if(updated != null){
            console.log(`${now} - the post ${id} has been updated with ${howManyLiked} likes`);
            return res.status(200).json(updated);
        }
        else {
            return res.status(404).json({message:`There isn't post ${id}`});
        }
    },

    async delete(req, res){
        if(token == String(req.headers.authorization)){
            const {id} = req.params;
            const post = await Post.findById(id);
            if(post.awsKey){
                await s3.deleteObject({
                    Bucket: String(process.env.AWS_S3_BUCKET),
                    Key: post.awsKey
                }).promise();
            }
            const now = Date.now();
            await post.deleteOne();
            if(post != null){
                console.log(`${now} - the post ${id} has been deleted`);
                return res.status(200).send();
            }
            else {
                return res.status(404).json({message:`There isn't post ${id}`});
            }
        }
        else {
            console.log(String(req.headers));
            return res.status(403).json({response:'Login failed'});
        }
    },

    async deleteAll(req, res){
        if(token == String(req.headers.authorization)){
           await Post.deleteMany({});
           const now = Date.now();
           console.log(`${now} - all the posts has been deleted`);
           return res.status(200).send();
        }
        else {
            return res.status(403).json({response:'Login failed'});
        }
    }
}