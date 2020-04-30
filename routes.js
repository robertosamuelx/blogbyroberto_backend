const express = require('express');
const HomeController = require('./src/controllers/HomeController');
const LoginController = require('./src/controllers/LoginController');
const routes = express.Router();

routes.get('/', HomeController.list);
routes.put('/post', HomeController.create);
routes.post('/post', HomeController.update);
routes.delete('/post/:id', HomeController.delete);
routes.post('/login',LoginController.login);
routes.delete('/post/all', HomeController.deleteAll);

module.exports = routes;