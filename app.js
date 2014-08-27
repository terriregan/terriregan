'use strict';

// Express Dependencies
var express             = require('express'),
    http                = require('http'),
    path                = require('path'),
    compress            = require('compression'),
    favicon             = require('static-favicon'),
    logger              = require('morgan'),
    methodOverride      = require('method-override'),
    cookieParser        = require('cookie-parser'),
    bodyParser          = require('body-parser'),
    expressValidator    = require('express-validator'),
    hbs                 = require('express-hbs'),
    routes              = require('./routes/index');

var app = express();
var port = Number(process.env.PORT || 5000);
console.log(port);

// For gzip compression
app.use(compress());

// Add custom header //
app.use(function (req, res, next) {
    res.set('X-Powered-By', 'Blood, Sweat and Tears');
    next();
});

// Config for Production and Development
if (app.get('env') === 'production') {
    // Set the default layout and locate layouts and partials
    app.engine('hbs', hbs.express3({
        defaultLayout: __dirname + '/dist/views/layouts/default.hbs',
        layoutsDir: __dirname + '/dist/views/layouts/',
        partialsDir: __dirname + '/dist/views/partials/'
    }));

    // Locate the views
    app.set('views', __dirname + '/dist/views');

    // Locate the assets
    app.use(express.static(path.join(__dirname, '/dist/public')));

} else {
    app.engine('hbs', hbs.express3({
        // Default Layout and locate layouts and partials
        defaultLayout: __dirname + '/views/layouts/default.hbs',
        partialsDir: __dirname + '/views/partials',
        layoutsDir: __dirname + '/views/layouts'
    }));

    // Locate the views
    app.set('views', __dirname + '/views');

    // Locate the assets
    app.use(express.static(path.join(__dirname, 'public')));
}

// Use Handlebars for templating
app.set('view engine', 'hbs');


// Express configuration.
//app.use(favicon());
app.use(methodOverride());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(expressValidator());
app.use(cookieParser());


// Set up routes
app.use('/', routes);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// Error handler for Development -- print stacktraces
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


// Error handler for Production -- suppress print stacktraces
app.use(function (err, req, res, next) {
    console.log('production error - ' +  err);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


// Boot up the server:
app.listen(port, function (err) {
    console.log('Express server listening on port ' + port);
});

module.exports = app;