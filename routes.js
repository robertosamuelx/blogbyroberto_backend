const express = require('express');
const HomeController = require('./src/controllers/HomeController');
const LoginController = require('./src/controllers/LoginController');
const routes = express.Router();

routes.get('/', HomeController.list);
routes.post('/create', HomeController.create);
routes.post('/update', HomeController.update);
routes.post('/delete', HomeController.delete);
routes.post('/login',LoginController.login);
routes.post('/deleteAll', HomeController.deleteAll);

module.exports = routes;