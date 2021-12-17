let express = require('express');
let AuthController = require('../controllers/AuthController.js');
let HomeController = require('../controllers/HomeController.js');
let AuthValidation =  require("../validation/AuthValidation.js");
let router = express.Router();

/**
 * Init all routes
 * @param app from exactly express module;
 */  
let initRoutes = (app) => {
    router.get('/login', AuthController.getLogin);
    router.post('/login', AuthController.postLogin);
    router.get('/register', AuthController.getSignUp);
    router.post('/register',AuthValidation.register, AuthController.postSignUp);
    router.get('/',HomeController.getHome);

    return app.use('/', router);
};

module.exports = initRoutes