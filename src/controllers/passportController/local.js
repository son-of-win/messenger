let passport = require("passport");
let passportLocal = require("passport-local");
let UserModel = require("./../../models/userModel.js");
let {authErrors, authSuccess} = require("./../../../lang/vi.js");
let localStrategy = passportLocal.Strategy;

// funtion initilize passport local
/**
 * valid user account type: local
 */

let InitPassportLocal = () => {
    passport.use(new localStrategy({
        usernameField: "username",  // lay thong tin tu form request
        passwordField: "password",
        passReqToCallback: true  // sau khi xac thuc se gui request ve callback function
    }, async (req, username, password, done) => {
        try {
            // check user
            let user = await UserModel.existUser(username);
            if (!user) {
                return done(null, false, req.flash("errors",authErrors.login_failed));
            }
            
            if (!user.local.isActive) {
                return done(null, false, req.flash("errors", authErrors.account_not_active));
            }
            // check pass
            let checkPassword = await user.comparePassword(password);
            if (!checkPassword) {
                return done(null, false, req.flash("errors",authErrors.login_failed));
            }

            return done(null, user);
        } catch(error) {
            console.log(error);
            return done(null, false, req.flash("errors",authErrors.server_error));
        }
    }));

    /**
     * save user to session , session alive for a day
     */

    passport.serializeUser((user, done) => {
        // only save userId to session
        done(null, user._id);
    });

    /**
     * Passport session in server.js call passport deserializeUser, get session was saved
     */

    passport.deserializeUser((id, done) => {
        UserModel.findUserById(id)
            .then( (user) => {
                return done(null, user);
            })
            .catch(error => {
                return done(error, null);
            })
    })
};

module.exports = {
    initPassportLocal: InitPassportLocal
};