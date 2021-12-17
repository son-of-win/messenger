let session = require('express-session');
let connectMongo = require("connect-mongodb-session")(session);

// let MongoStore = new connectMongo(session);

//noi luu session
/**
 * This variable is where save session, in this case is mongodb
 */
let sessionStore = new connectMongo({
    uri: `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    // autoReconnect: true,
    autoRemove: "native",  // khi cookie het han tu dong xoa trong db
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