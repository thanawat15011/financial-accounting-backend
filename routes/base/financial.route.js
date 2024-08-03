const { authJwt,authCompany } = require("../../middlewares");
const { FinancialController } = require('../../controllers');

module.exports = function (app) {
    app.post('/financial/getFinancialBy', FinancialController.getFinancialBy);
    app.post('/financial/getFinancialById', FinancialController.getFinancialById);
    app.post('/financial/insertFinancial', FinancialController.insertFinancial);
    app.post('/financial/updateFinancialById', FinancialController.updateFinancialById);
    app.post('/financial/deleteFinancialById', FinancialController.deleteFinancialById);
};
