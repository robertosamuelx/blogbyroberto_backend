const express = require('express');
const HomeController = require('./src/controllers/HomeController');
const LoginController = require('./src/controllers/LoginController');
const ContactController = require('./src/controllers/ContactController');
const routes = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const s3 = new aws.S3();
const multerConfig = require('./src/config/multerConfig');

routes.get('/', HomeController.list);
routes.put('/post',multer(multerConfig).single('file'), HomeController.create);
routes.post('/post', HomeController.update);
routes.delete('/post/:id', HomeController.delete);
routes.post('/login',LoginController.login);
routes.delete('/post/all', HomeController.deleteAll);
routes.post('/sendContact', ContactController.send);

module.exports = routes;