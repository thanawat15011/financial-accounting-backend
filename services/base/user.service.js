// services/base/building.service.js
const { UserModel } = require('../../models');
const jwt = require("jsonwebtoken")
const APP_CONFIG = require("../../configs/app")
const Task = function (task) {
    this.task = task.task
}

Task.getUserBy = (data, connection) => UserModel.getUserBy(data, connection);
Task.getUserById = (data, connection) => UserModel.getUserById(data, connection);
Task.insertUser = (data, connection) => UserModel.insertUser(data, connection);
Task.updateUserById = (data, connection) => UserModel.updateUserById(data, connection);
Task.deleteUserById = (data, connection) => UserModel.deleteUserById(data, connection)
Task.checkLogin = async (data, connection) => {
    let result = await UserModel.checkLogin(data, connection)
    const { user_table_uuid } = result.data[0]
    if (user_table_uuid) {
      result.x_access_token = jwt.sign({ user_table_uuid }, APP_CONFIG.secret, { expiresIn: 86400 })
    }
    return result
  }

module.exports = Task;
