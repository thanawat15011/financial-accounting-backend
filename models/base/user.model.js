// models/base/school.model.js
const db = require("../../configs/db.json")
const { v4: uuidv4 } = require("uuid")
const saltRounds = 10
const bcrypt = require("bcrypt")

const Task = function (task) {
  this.task = task.task
  this.status = task.status
  this.created_at = new Date()
}
Task.getUserBy = function getUserBy(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `
        SELECT *
        FROM ${db["base"]}.tb_user AS tb1
        where 1
        `
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err })
      } else {
        resolve({ data: res, require: true })
      }
    })
  })
}

Task.getUserById = function getUserById(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `
        SELECT 
        tb1.*
        FROM ${db["base"]}.tb_user AS tb1
        WHERE tb1.user_table_uuid = 
        ${connection.escape(data.user_table_uuid)}`
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err })
      } else {
        resolve({ data: res, require: true })
      }
    })
  })
}
Task.insertUser = function insertUser(data, connection) {
  return new Promise((resolve, reject) => {
    const user_table_uuid = uuidv4()
    bcrypt.hash(data.password, saltRounds, function (err, hashedPassword) {
      if (err) {
        reject({ data: [], require: false, err: err })
      } else {
        let sql = `INSERT INTO ${db["base"]}.tb_user SET 
                    user_table_uuid = ${connection.escape(user_table_uuid)}, 
                    username = ${connection.escape(data.username)}, 
                    password = ${connection.escape(hashedPassword)}, 
                    employee_table_uuid = ${connection.escape(data.employee_table_uuid)}
                    `
        connection.query(sql, function (err, res) {
          if (err) {
            reject({ data: [], require: false, err: err })
          } else {
            resolve({ data: [], require: true })
          }
        })
      }
    })
  })
}
Task.checkLogin = function checkLogin(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `
                  SELECT * 
                  FROM ${db["base"]}.tb_user AS tb1 
                  WHERE username = ${connection.escape(data.username)};
              `
    connection.query(sql, function (err, res) {
      if (err) {
        reject({ data: [], require: false, err: err })
      } else {
        if (res.length === 0) {
          resolve({ data: [], require: false, err: "User not found" })
        } else {
          const hashedPassword = res[0].password
          bcrypt.compare(data.password, hashedPassword, function (err, match) {
            if (err) {
              reject({ data: [], require: false, err: err })
            } else if (!match) {
              resolve({ data: [], require: false, err: "Incorrect password" })
            } else {
              res[0].password = ""
              resolve({ data: res, require: true })
            }
          })
        }
      }
    })
  })
}

Task.updateUserById = function updateUserById(data, connection) {
  return new Promise((resolve, reject) => {
    let str_repass = ""
    if(data.password != "" && data.password != null){
      let newPass = bcrypt.hashSync(data.password, saltRounds)
      str_repass += `password = ${connection.escape(newPass)},`
    }
    let sql = `
              UPDATE ${db["base"]}.tb_user SET 
              username = ${connection.escape(data.username)}, 
              ${str_repass}
              employee_table_uuid = ${connection.escape(data.employee_table_uuid)}
        `
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err })
      } else {
        resolve({ data: res, require: true })
      }
    })
  })
}

Task.deleteUserById = function deleteUserById(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM ${db["base"]}.tb_user WHERE user_table_uuid = ${connection.escape(data.user_table_uuid)}`
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err })
      } else {
        resolve({ data: res, require: true })
      }
    })
  })
}

module.exports = Task
