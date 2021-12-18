let session = require('express-session');
let connectMongo = require("connect-mongodb-session")(session);

// let MongoStore = new connectMongo(session);

//định nghĩa nơi lưu session
/**
 * biến này chỉ định nơi sẽ lưu trữ session, trong trường hợp này sẽ lưu trong csdl mongodb
 */
let sessionStore = new connectMongo({
    uri: `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    // autoReconnect: true,
    autoRemove: "native",  //khi cookie hết hạn sẽ tự động xoá trong db
    collection: 'mySession'
});
/**
 * Config session for app
 * @param app from exactly express module
 */
let configSession = (app) => {
    app.use(session({
        key: "express.sid",
        secret: "mySecret",
        // store: - mặC đỊnh lưu trên ram
        store:sessionStore,
        resave: true,
        saveUninitialized: false,
        cookie: { // thời gian sống của cookie
            maxAge: 1000*60*60*24 // thời gian sống 1 ngày (miliseconds)
        }
    }));
};

module.exports = configSession;