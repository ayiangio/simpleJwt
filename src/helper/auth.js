const jwt = require('jsonwebtoken');
const respon = require('./response');
const allowedAccess = 'auth'

module.exports ={
    authInfo: (req, res, next) => {
        const headerAuth = req.headers["authorization"]
        const headerSecret = req.headers['x-access-token']
        if (headerAuth !== allowedAccess) {
            return respon.response(res, null, 401, 'Unauthorized, Need access token!')
        } else if (typeof headerSecret === 'undefined') {
            // console.log('masuk')
            next()
        } else {
            console.log(headerSecret)
            const bearerToken = headerSecret.split(' ')
            const token = bearerToken[1]
            req.token = token
            // console.log(req.token);            
            next()
        }
    },
    accessToken: (req, res, next) => {
        const secretKey = "jwt12345"
        const accessToken = req.token
        const userToken = req.headers['user-token']
        // console.log(userToken)

        jwt.verify(accessToken, secretKey, (err, decoded) => {
            console.log(decoded)
            if (err && err.name === 'TokenExpiredError') return respon.response(res, null, 402, 'Token expired')

            if (err && err.name === 'JsonWebTokenError') return respon.response(res, null, 401, 'Invalid Token')
            // console.log(decoded.id_user)
            if (parseInt(userToken) !== parseInt(decoded.id_user)) return respon.response(res, null, 401, 'Invalid User Token')
            next()
        })
    }
}