const express = require('express');
const route = express.Router();
const HomeController = require('./src/controllers/HomeController');
const StudentsController = require('./src/controllers/StudentsController');
const AuthenticationController = require('./src/controllers/AuthenticationController');

const { loginRequired } = require('./src/MiddleWares/GlobalMiddleware');

route.get('/', HomeController.index);

// Students routes
route.get('/students/status', loginRequired, StudentsController.status); 
route.get('/students/new', loginRequired, StudentsController.new);
route.post('/students/create', loginRequired, StudentsController.create);
route.get('/students/delete/', loginRequired, StudentsController.delete);


//Authentication routes
route.get('/auth/login', AuthenticationController.loginPage);
route.get('/auth/logout', AuthenticationController.logout);
route.get('/auth/register', AuthenticationController.registerPage)
route.post('/auth/login', AuthenticationController.login);
route.post('/auth/register', AuthenticationController.register);

module.exports = route;