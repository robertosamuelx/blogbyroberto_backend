const express = require('express');
const HomeController = require('./src/controllers/HomeController');
const LoginController = require('./src/controllers/LoginController');
const routes = express.Router();

routes.get('/', HomeController.list);
routes.put('/create', HomeController.create);
routes.post('/update', HomeController.update);
routes.delete('/delete', HomeController.delete);
routes.post('/login',LoginController.login);

module.exports = routes;