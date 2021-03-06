const {validationResult} = require("express-validator");
const {authErrors, transMail, authSuccess} = require("../../lang/vi.js");
let {AuthService} = require("./../services/index.js");
let getLogin = (req, res) => {
    return res.render('main/login', {
        errors: req.flash("errors"),
        success: req.flash("success")
    });
};

let getSignUp = (req, res) => {
    return res.render('main/signup', {
        errors: req.flash("errors"),
        success: req.flash("success")
    });
};

let verifyAccount = async (req, res) => {
    let errorArr = [];
    let successArr = [];
    try {
        let verifySuccess = await AuthService.verifyToken(req.params.token);
        successArr.push(verifySuccess);
        req.flash("success", successArr)
        return res.redirect("/register");
    } catch (error) {
        errorArr.push(transMail.verify_error);
        req.flash("errors", errorArr);
        return res.redirect("/register");
    }
};

let postSignUp = async (req, res) => {
    let errorArr = [];
    let successArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        // console.log(errors);
        errors.forEach(item => {
            errorArr.push(item.msg);
        });
        // console.log(errorArr);
        req.flash("errors", errorArr);
        return res.redirect("/register");
    }
    try {
        let accountCreateSuccess = await AuthService.register(req.body.username, req.body.email, req.body.password, req.protocol, req.get("host"));  //lấy host, protocol từ request
        successArr.push(accountCreateSuccess);
        req.flash("success", successArr);
        return res.redirect("/register");
    } catch(error) {
        errorArr.push(error);
        req.flash("errors", errorArr);
        return res.redirect("/register");
    };
    
};

let getLogOut = (req, res) => {
    req.logout(); // remove passport user save in session
    req.flash("success", authSuccess.logoutSuccess);
    return res.redirect('/login');
}

let checkLoggedIn = (req, res, next) => {
    /**
     * nếu đã login  => được redirect sang home page
     * nếu chưa login => quay về trang login
     */
    if(!req.isAuthenticated()) {
        return res.redirect('/login');
    }

    next();
}


let checkLoggedOut = (req, res, next) => {
    /**
     * nếu đã login  => được redirect sang home page
     * nếu chưa login => quay về trang login
     */
    if(req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}
module.exports = {
    getLogin: getLogin,
    getSignUp: getSignUp,
    getLogOut: getLogOut,
    postSignUp: postSignUp,
    verifyAccount: verifyAccount,
    checkLoggedIn: checkLoggedIn,
    checkLoggedOut: checkLoggedOut
};