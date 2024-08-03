const db = require("../../configs/db.json")
const { v4: uuidv4 } = require("uuid")
const Task = function (task) {
  this.task = task.task
  this.status = task.status
  this.created_at = new Date()
}
Task.getFinancialBy = function getFinancialBy(data, connection) {
  var str_project = ""
  if(data.site_table_uuid){
    str_project = `AND tb1.site_table_uuid = "${data.site_table_uuid}"`
  }
  return new Promise((resolve, reject) => {
    let sql =
      `
        SELECT *
        FROM ${db["base"]}.tb_financial AS tb1 
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

Task.getFinancialById = function getFinancialById(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `
        SELECT * FROM ${db["base"]}.tb_financial AS tb1 
        WHERE tb1.financial_table_uuid = 
        ${connection.escape(data.financial_table_uuid)}`
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err })
      } else {
        resolve({ data: res, require: true })
      }
    })
  })
}

Task.insertFinancial = function insertFinancial(data, connection) {
  return new Promise((resolve, reject) => {
    const financial_table_uuid = uuidv4()
    let sql = `
            INSERT INTO ${db["base"]}.tb_financial 
            SET 
                financial_table_uuid = ${connection.escape(financial_table_uuid)},
                financial_name = ${connection.escape(data.financial_name)},
                financial_type = ${connection.escape(data.financial_type)}, 
                detail_type = ${connection.escape(data.detail_type)}, 
                financial_date = ${connection.escape(data.financial_date)}, 
                create_date = now(), 
                create_by = ${connection.escape(data.user_table_uuid)};
        `
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err })
      } else {
        resolve({ data: { insertId: res.insertId }, require: true })
      }
    })
  })
}

Task.updateFinancialById = function updateFinancialById(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE ${db["base"]}.tb_financial SET 
    financial_name = ${connection.escape(data.financial_name)}, 
    financial_type = ${connection.escape(data.financial_type)}, 
    detail_type = ${connection.escape(data.detail_type)}, 
    financial_date = ${connection.escape(data.financial_date)}, 
    update_date = now(),
    update_by = ${connection.escape(data.employee_table_uuid)}
    WHERE financial_table_uuid = ${connection.escape(data.financial_table_uuid)}`
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err })
      } else {
        resolve({ data: res, require: true })
      }
    })
  })
}

Task.deleteFinancialById = function deleteFinancialById(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM ${db["base"]}.tb_financial WHERE financial_table_uuid = ${connection.escape(data.financial_table_uuid)}`
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
