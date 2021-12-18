require('dotenv').config()
let express = require("express");
let connectDB = require('./config/connectDB.js');
let configViewEngine = require('./config/viewEngine.js');
let connectFlash = require('connect-flash');
let configSession = require('./config/session.js');
let initRoutes  = require('./routes/router.js');
let passport = require('passport');

// Init app
let app = express();

// Connect to mongodb
connectDB();

// config Session
configSession(app);

// config view engine
configViewEngine(app);

// enable post data for request
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// enable connect-flash for show message to user
app.use(connectFlash());

// Config passport
app.use(passport.initialize());
app.use(passport.session());

// init all routes
initRoutes(app)


app.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log(`Server is running on ${process.env.HOSTNAME}: ${process.env.PORT}`);
  });
  