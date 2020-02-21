const respon = require('../helper/response');
const jwt = require('jsonwebtoken')
module.exports = {
    login: (req, res) => {
        const username = req.body.username
        const password = req.body.password
        if (username == "ayi") {
            const dataUser = {
                username: username,
                password: password,
                id_user: 1
            }

            if (dataUser.username == "ayi") {
                dataUser.token = jwt.sign({
                    id_user: dataUser.id_user,
                    username: username
                }, "jwt12345", {
                    expiresIn: '120m'
                })
                delete dataUser.password

                return respon.response(res, dataUser, 200)
            } else {
                return respon.response(res, null, 403, "Wrong Password !!!")
            }
        }

        else {
            return respon.response(res, null, 403, "username Not Register !!!")
        }
    },
    data: (req, res) => {
        return respon.response(res, null, 200, "Masuk")
    }
}