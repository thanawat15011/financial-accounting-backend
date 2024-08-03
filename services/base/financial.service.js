// services/base/building.service.js
const { FinancialModel } = require('../../models');

const Task = function (task) {
    this.task = task.task
}

Task.getFinancialBy = (data, connection) => FinancialModel.getFinancialBy(data, connection);
Task.getFinancialById = (data, connection) => FinancialModel.getFinancialById(data, connection);
Task.insertFinancial = (data, connection) => FinancialModel.insertFinancial(data, connection);
Task.updateFinancialById = (data, connection) => FinancialModel.updateFinancialById(data, connection);
Task.deleteFinancialById = (data, connection) => FinancialModel.deleteFinancialById(data, connection)

module.exports = Task;
