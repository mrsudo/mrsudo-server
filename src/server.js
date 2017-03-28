const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require("express");
const bodyParser = require("body-parser");

// import cli from './controllers/cli';

// FIXME Probably not a good idea
const config = require('./config/config.' + process.env.NODE_ENV);

//
const app = express();

// Configuration
app.configure(() => {
    app.use(express.static(config.rootPath + "/public"));
    // app.use(express.logger('dev'));

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
})

// Routes
// app.get('/', cli.execute);

// Bootstrap
app.listen(config.port, () => {
    console.log("Listening on port " + config.port + '...');
});
