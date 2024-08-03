// Services/base/building.Service.js

const { FinancialService } = require('../../services');

const Task = function (task) {

    this.task = task.task;
}

Task.getFinancialBy = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await FinancialService.getFinancialBy(req.body, connection);
        success(result);
    } catch (err) {
        error(err);
    }
});


Task.getFinancialById = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await FinancialService.getFinancialById(req.body, connection);
        success(result);
    } catch (err) {
        error(err);
    }
});

Task.insertFinancial = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        const result = await FinancialService.insertFinancial(req.body, connection);
        success(result);
    } catch (err) {
        error(err);
    }
});

Task.updateFinancialById = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        const result = await FinancialService.updateFinancialById(req.body, connection);
        success(result);
    } catch (err) {
        error(err);
    }
});

Task.deleteFinancialById = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        const result = await FinancialService.deleteFinancialById(req.body, connection);
        success(result);
    } catch (err) {
        error(err);
    }
});

module.exports = Task;
