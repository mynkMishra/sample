var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();


// Cross origin resourse sharing config
app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

const mongoose = require('mongoose')

const config = require('./config/config')


//connecting with DB Server
const DB_URL = config.DB_URL
console.log(typeof process.env.DB_URL)
console.log(process.env.DB_URL)
console.log(process.env.NODE_ENV)
console.log(process.env.PORT)
mongoose.connect(DB_URL || process.env.DB_URL,{ useNewUrlParser: true }).then(()=>{
    console.log("Successfully connected to MongoDB");
}).catch((err)=>{
    console.log("Unable to connect to MongoDB ",err);
});

//listening at PORT
const PORT = config.PORT
app.listen(PORT || process.env.PORT,()=>{
    console.log('Server started at',PORT )
})
module.exports = app;
