let express = require('express');
let AuthController = require('../controllers/AuthController.js');
let HomeController = require('../controllers/HomeController.js');
let AuthValidation =  require("../validation/AuthValidation.js");
let {initPassportLocal} = require("./../controllers/passportController/local.js");
let passport = require("passport");
/**
 * init all passport local
 */
initPassportLocal();

let router = express.Router();


/**
 * Init all routes
 * @param app from exactly express module;
 */  
let initRoutes = (app) => {
    router.get('/login', AuthController.getLogin);
    router.post('/login',passport.authenticate("local",{
        successRedirect: "/", // authen success redirect to home
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));

    // nếu đã đăng nhập thì mớI được logout
    router.get('/logout', AuthController.checkLoggedIn, AuthController.getLogOut);
    router.get('/register', AuthController.getSignUp);
    router.post('/register',AuthValidation.register, AuthController.postSignUp);
    router.get('/verify/:token', AuthController.verifyAccount);
    // nếu đã đăng nhập thì mớI đến trang home
    router.get('/',AuthController.checkLoggedIn, HomeController.getHome);
    

    return app.use('/', router);
};

module.exports = initRoutes