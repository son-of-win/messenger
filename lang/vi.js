const TransValidation = {
    email_incorrect: "Email phai co dang example@gmail.com",
    password_incorrect:"Password is not fine",
    password_confirmation_incorrect:"Password is not matched"
};

const AuthErrors = {
    account_in_use: "This username existed, use another plz!!!!",
    account_not_active:"Account is created but not actived, please check mail to active",
    account_remove: "Account had been deleted!",
    login_failed: "Username or password is wrong!!!",
    server_error: "Error in server, try login later or contact to admin"
}

const AuthSuccess = {
    userCreated: (username) =>{
        return `Your account with username: <strong>${username}</strong> is created, check your mail to active your account`;
    },
    loginSuccess: (username) => {
        return `Xin chào ${username}`;
    },
    logoutSuccess: "Log out success, see you again"
};

const TransMail = {
    subject: "HuuVuot Messenger: Xác nhận kích hoạt tài khoản",
    template: (linkVerify) => {
        return `
            <h2> Bạn nhận được mail này vì đã đăng ký tài khoản trên ứng dụng Messenger. </h2>
            <h3> Vui lòng click vào liên kết bên dưới để xác nhận kích hoạt tài khoản. </h3>
            <h3><a href="${linkVerify}" target="blank">${linkVerify}</a></h3>
            <h4>Trân trọng cảm ơn</h4>
        `;
    },
    send_failed: "Error in sending mail, please contact to admin",
    verify_success: "Your account is activated, Welcome to my messenger, please login",
    verify_error: "Verify your account failed, please contact to admin",
    error_token: "Your token does not exist"
};




module.exports = {
    transValidation: TransValidation,
    authErrors: AuthErrors,
    authSuccess: AuthSuccess,
    transMail: TransMail
};