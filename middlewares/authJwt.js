const jwt = require("jsonwebtoken")
const APP_CONFIG = require("../configs/app")
const companyUUIDHelper = require("../shared/tools/companyUUIDHelper")
const lineTokenHelper = require("../shared/tools/lineTokenHelper")

module.exports = {
  verifyToken: (req, res, next) => {
    let token = req.headers["x-access-token"]

    if (!token) {
      return res.status(403).send({
        data: [],
        require: false,
        unauthorized: true,
        error: "No token provided!",
      })
    } else {
      jwt.verify(token, APP_CONFIG.secret, (err, decoded) => {
        if (err) {
          return res.status(401).send({
            data: [],
            require: false,
            unauthorized: true,
            error: "Unauthorized!",
          })
        }

        next()
      })
    }

    // if (req.headers["check_school_table_uuid"] === "logout" || req.headers["check_school_table_uuid"] === "" || req.headers["check_school_table_uuid"] === undefined || req.headers["check_school_table_uuid"] === "undefined") {
    //   schoolUUIDHelper.setCheckSchoolUUID()
    // } else if (req.headers["check_school_table_uuid"] !== "null") {
    //   const check_school_table_uuid = req.headers["check_school_table_uuid"]
    //   schoolUUIDHelper.setCheckSchoolUUID(`'${check_school_table_uuid}'`)
    // }
    
    // if (req.headers["check_academic_year_table_uuid"] === "logout" || req.headers["check_academic_year_table_uuid"] === "" || req.headers["check_academic_year_table_uuid"] === undefined || req.headers["check_academic_year_table_uuid"] === "undefined") {
    //   schoolUUIDHelper.setCheckacAdemicYearUUID()
    //   schoolUUIDHelper.setCheckYearTermUUID()
    // } else if (req.headers["check_academic_year_table_uuid"] !== "null") {
    //   const check_academic_year_table_uuid = req.headers["check_academic_year_table_uuid"]
    //   const check_year_term = req.headers["check_year_term"]
    //   schoolUUIDHelper.setCheckYearTermUUID(`'${check_year_term}'`)
    //   schoolUUIDHelper.setCheckacAdemicYearUUID(`'${check_academic_year_table_uuid}'`)
    // }

    if (
      req.headers["company_table_uuid"] == undefined ||
      req.headers["company_table_uuid"] == "" ||
      req.headers["company_table_uuid"] == "null" ||
      req.headers["company_table_uuid"] == null
    ) {
      companyUUIDHelper.setCompanyUUID(undefined)
    } else {
      const company_table_uuid = req.headers["company_table_uuid"]
      companyUUIDHelper.setCompanyUUID(company_table_uuid)
    }

    if (
      req.headers["token_line"] == undefined ||
      req.headers["token_line"] == "" ||
      req.headers["token_line"] == "null" ||
      req.headers["token_line"] == null
    ) {
      lineTokenHelper.setLineToken(undefined)
    } else {
      const token_line = req.headers["token_line"]
      lineTokenHelper.setLineToken(token_line)
    }


  },
}
