const express = require('express')
const bodyParser = require('body-parser')
const bs = require('./src/middleware/bs')
const auth = require('./src/middleware/auth')

var app = express()

// application/json, any Unicode, gzip/deflate
app.use(bodyParser.json()) 

// application/x-www-form-urlencoded, UTF-8, gzip/deflate
app.use(bodyParser.urlencoded({ extended: false }))

// authorization middleware
app.use(auth)
bs(app)


// error handler
// catch unauthorized error and other forward to error handler
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.json({
            message: 'Invalid Token',
            success: false,
        })
    } else {
      next(err, req, res, next)
    }
})
  

app.listen(9000)
console.log('...server start at port:9000')