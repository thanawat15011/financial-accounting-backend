const companyUUIDHelper = require("../shared/tools/companyUUIDHelper")
const lineTokenHelper = require("../shared/tools/lineTokenHelper")

module.exports = {
  setCompany: (req, res, next) => {
    if (
      req.headers["company_table_uuid"] === "" ||
      req.headers["company_table_uuid"] === undefined ||
      req.headers["company_table_uuid"] === "undefined" ||
      req.headers["company_table_uuid"] === null ||
      req.headers["company_table_uuid"] === "null"
      
    ) {
      companyUUIDHelper.setCompanyUUID()
    } else if (req.headers["company_table_uuid"] !== "null") {
      const company_table_uuid = req.headers["company_table_uuid"]
      companyUUIDHelper.setCompanyUUID(`'${company_table_uuid}'`)
    }

    if (
      req.headers["token_line"] === "" ||
      req.headers["token_line"] === undefined ||
      req.headers["token_line"] === "undefined" ||
      req.headers["token_line"] === null ||
      req.headers["token_line"] === "null"
      
    ) {
      lineTokenHelper.setLineToken()
    } else if (req.headers["token_line"] !== "null") {
      const token_line = req.headers["token_line"]
      lineTokenHelper.setLineToken(`${token_line}`)
    }
    next();
  },
}
