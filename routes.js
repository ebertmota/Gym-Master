const express = require('express');
const route = express.Router();
const HomeController = require('./src/controllers/HomeController');
const StudentsController = require('./src/controllers/StudentsController');
const AuthenticantionController = require('./src/controllers/AuthenticationController')

route.get('/', HomeController.index);

route.get('/students/status', StudentsController.status); 
route.get('/students/new',StudentsController.new);

route.get('/auth/login', AuthenticantionController.login);
route.get('/auth/register', AuthenticantionController.register);

module.exports = route;