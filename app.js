const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const appRoutes = require('./routes/app');
const msgsRoutes = require('./routes/msgs');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb://localhost:27017/ms08-01');
// mongoose.connect('mongodb://abbie:654321@ds014388.mlab.com:14388/ms08-02');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/popper.js/dist/umd')));

// Middleware to process cors errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

// Order is important
app.use('/api/msgs', msgsRoutes);
app.use('/api/users', userRoutes);
app.use('/', appRoutes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    return res.render('index');
});

module.exports = app;
