const express = require('express');
const HomeController = require('./src/controllers/HomeController');
const routes = express.Router();

routes.get('/', HomeController.list);
routes.put('/create', HomeController.create);
routes.post('/update', HomeController.update);
routes.delete('/delete', HomeController.delete);

module.exports = routes;