let {transValidation} = require("./../../lang/vi.js");
let {check} = require('express-validator');
let register = [
    check("email",transValidation.email_incorrect)
        .isEmail()
        .trim(),
    check("password", transValidation.password_incorrect)
        .isLength({min: 8}) // toi thieu 8 ky tu
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*>&])[A-Za-z\d$@$!%*?&]{8,}$/),
    check("password_confirmation", transValidation.password_confirmation_incorrect)
        .custom((value, {req})=> {
            return value == req.body.password;
        })
];

module.exports = {
    register: register
};