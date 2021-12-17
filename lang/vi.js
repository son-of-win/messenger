const TransValidation = {
    email_incorrect: "Email phai co dang example@gmail.com",
    password_incorrect:"Password is not fine",
    password_confirmation_incorrect:"Password is not matched"
};

const AuthErrors = {
    account_in_use: "This username existed, use another plz!!!!",
    account_not_active:"Account is created but not actived, please check mail to active",
    account_remove: "Account had been deleted!"
}

const AuthSuccess = {
    userCreated: (username) =>{
        return `Your account with username: <strong>${username}</strong> is created, check your mail to active your account`;
    }
};
module.exports = {
    transValidation: TransValidation,
    authErrors: AuthErrors,
    authSuccess: AuthSuccess
};