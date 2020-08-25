const expressJWT = require('express-jwt')
const jwtCfg = require('../../config/jwt.json')
const token = require('../utils/token')

module.exports = expressJWT({
    secret: Buffer.from(jwtCfg.token_key, 'base64'),
    requestProperty: 'user', // By default, the decoded token is attached to req.user
    credentialsRequired: true, // You might want to use this module to identify registered users while still providing access to unregistered users
    getToken: token.getHeaderToken, // Where the token is
    algorithms: ['HS256']
  }).unless({ // 排除路径
    path: [
      '/api/user/register',
      '/api/user/login',
    ]
  })