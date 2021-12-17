let UserModel = require("./../models/userModel.js");
let {authErrors, authSuccess} = require("./../../lang/vi.js");
let uuid_v4 = require("uuid");
let bcrypt = require('bcrypt');

let saltRounds = 7;
let register = (username, email , password) => {
    return new Promise(async (resolve, reject) => {
        let getUserByUsername = await UserModel.existUser(username);
        // console.log("find: ", getUserByUsername);
        if(getUserByUsername) {
            if(getUserByUsername.deleteAt != null) {
                return reject(authErrors.account_removed);
            }
            if(!getUserByUsername.local.isActive) {
                return reject(authErrors.account_not_active); 
            }
            return reject(authErrors.account_in_use);
        }

        let salt = bcrypt.genSaltSync(saltRounds);
        let userItem = {
            username: username,
            local: {
                email: email,
                password: bcrypt.hashSync(password, salt),
                verifyToken: uuid_v4.v4()
            }
        };
        
        // vi userModel return mot promise
        let user = await UserModel.createNew(userItem);
        resolve(authSuccess.userCreated(user.username));
    });
};

module.exports = {
    register: register
}