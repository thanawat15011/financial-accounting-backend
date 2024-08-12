// routes/base/index.js

module.exports = (app) => {
    require("./financial.route")(app)
    require("./user.route")(app)
}
