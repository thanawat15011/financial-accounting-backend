const { authJwt } = require("../../middlewares")

const { UserController } = require('../../controllers')

module.exports = function (app) {

    app.post('/user/checkLogin', UserController.checkLogin)
    app.post('/user/checkUser',  UserController.checkUser)
    app.post('/user/getUserBy',  UserController.getUserBy)
    app.post('/user/getUserById',  UserController.getUserById)
    app.post('/user/insertUser',   UserController.insertUser)
    app.post('/user/updateUserById',  UserController.updateUserById)
    app.post('/user/deleteUserById',  UserController.deleteUserById)
}