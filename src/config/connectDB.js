require('dotenv').config()
let mongoose = require('mongoose');
let bluebird = require('bluebird');


/**
 * Connect to mongoDB
 */

let connectDB = () => {
    mongoose.Promise = bluebird;
    // mongodb://localhost:27017/messenger
    let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

    return mongoose.connect(URI);
};

module.exports = connectDB;