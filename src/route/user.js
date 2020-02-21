module.exports = (app) => {
    const user = require('../controller/user');
    const auth = require('../helper/auth')
    app
        .post('/login',auth.authInfo, user.login)
        .get ('/data',auth.authInfo, auth.accessToken,user.data)
}