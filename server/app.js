const express = require('express')
const bodyParser = require('body-parser')
const bs = require('./src/middleware/bs')
const auth = require('./src/middleware/auth')
const errInfo = require('./src/common/errcode')

var app = express()

// application/json, any Unicode, gzip/deflate
app.use(bodyParser.json()) 

// application/x-www-form-urlencoded, UTF-8, gzip/deflate
app.use(bodyParser.urlencoded({ extended: false }))


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Expose-Headers", 'x-user-token');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-user-token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});

app.use(function (req, res, next) {
    if (req.method === 'OPTIONS') {
        res.status(200)
        res.json()
        return;
    } 
    
    next()
})

// authorization middleware
app.use(auth)
bs(app)


// error handler
// catch unauthorized error and other forward to error handler
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(200);
        return res.json({
            msg: '登录失效',
            retcode: 401,
        })
    } else {
      next(err, req, res, next)
    }
})
  

app.listen(9000)
console.log('...server start at port:9000')