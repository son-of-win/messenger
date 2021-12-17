const {validationResult} = require("express-validator");
let {AuthService} = require("./../services/index.js");
let getLogin = (req, res) => {
    return res.render('main/login')
};

let postLogin = (req, res) => {
    console.log(req.body);
}
let getSignUp = (req, res) => {
    return res.render('main/signup', {
        errors: req.flash("errors"),
        success: req.flash("success")
    });
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
        let accountCreateSuccess = await AuthService.register(req.body.username, req.body.email, req.body.password);
        successArr.push(accountCreateSuccess);
        req.flash("success", successArr);
        return res.redirect("/register");
    } catch(error) {
        errorArr.push(error);
        req.flash("errors", errorArr);
        return res.redirect("/register");
    };
    
};

module.exports = {
    getLogin: getLogin,
    postLogin: postLogin,
    getSignUp: getSignUp,
    postSignUp: postSignUp
};