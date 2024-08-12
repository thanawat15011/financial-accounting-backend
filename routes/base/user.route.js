const { authJwt } = require("../../middlewares")

const { UserController } = require('../../controllers')

module.exports = function (app) {

    app.post('/user/checkLogin', UserController.checkLogin)
    app.post('/user/checkUser', authJwt.verifyToken, UserController.checkUser)
    app.post('/user/getUserBy', authJwt.verifyToken, UserController.getUserBy)
    app.post('/user/getUserById', authJwt.verifyToken, UserController.getUserById)
    app.post('/user/insertUser',   UserController.insertUser)
    app.post('/user/updateUserById', authJwt.verifyToken, UserController.updateUserById)
    app.post('/user/deleteUserById', authJwt.verifyToken, UserController.deleteUserById)
}