const {validationResult} = require("express-validator");
let getLogin = (req, res) => {
    return res.render('main/login')
};

let postLogin = (req, res) => {
    console.log(req.body);
}
let getSignUp = (req, res) => {
    return res.render('main/signup', {
        errors: req.flash("errors")
    });
};
let postSignUp = (req, res) => {
    let errorArr = [];
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
};

module.exports = {
    getLogin: getLogin,
    postLogin: postLogin,
    getSignUp: getSignUp,
    postSignUp: postSignUp
};