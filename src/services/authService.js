let UserModel = require("./../models/userModel.js");
let {authErrors, authSuccess, transMail} = require("./../../lang/vi.js");
let uuid_v4 = require("uuid");
let bcrypt = require('bcrypt');
let {sendMail} = require("./../config/mailer.js");

let saltRounds = 7;
let register = (username, email , password, protocol, host) => {
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
        
        // UserMode.createNew return a Promise
        let user = await UserModel.createNew(userItem);
        let linkVerify = `${protocol}://${host}/verify/${user.local.verifyToken}`; // verifytoken được gen từ uuidv4
        //send mail confirm
        sendMail(email,transMail.subject, transMail.template(linkVerify))
            .then(success => {
                resolve(authSuccess.userCreated(user.username));
            })
            .catch( async (error) => {
                // remove user
                await UserModel.removeUserById(user._id);
                console.log(error);
                reject(transMail.send_failed);
            });

    });
};

let login = (username, password) => {
    
}
let verifyToken = (token) => {
    return new Promise( async (resolve, reject) => {
        let existToken = await UserModel.findUserByToken(token);
        if (!existToken) {
            return reject(transMail.error_token);
        }
        UserModel.verify(token)
        resolve(transMail.verify_success);
    });
}
module.exports = {
    register: register,
    verifyToken: verifyToken
}