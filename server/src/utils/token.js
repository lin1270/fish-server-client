const jwt = require('jsonwebtoken')
const cfg = require('../../config/jwt.json') 

const secret = Buffer.from(cfg.token_key, 'base64')

module.exports = {
    generateToken(payload) {
        return jwt.sign(payload, secret, { expiresIn: cfg.timeout })
    },

    verifyToken(token) {
        try {
            return jwt.verify(token, secret)
        } catch (err) {
            return false
        }
    },

    decodeToken(token) {
        return jwt.decode(token);
    },

    refreshToken(token) {
        var payload = this.decodeToken(token)
        var token = null
        if (payload) {
            token = jwt.sign({ uid: payload.uid }, secret, { expiresIn: cfg.timeout })
        }

        return token
    },

    getHeaderToken(req) {
        return req.headers['x-user-token']
    },

    setHeaderToken(req, res, payload, needRefresh=true) {
        let token = this.getHeaderToken(req)
        if (!token || token == 'null') token = this.generateToken(payload || {})
        else if (needRefresh) token = this.refreshToken(token)
        if (!token) token = this.generateToken(payload || {})
        return res.header('x-user-token', token)
    },
}