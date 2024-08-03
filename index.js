// index.js
const schedule = require("node-schedule");
const express = require("express");
const app = express();
const APP_CONFIG = require("./configs/app");
const db = require("./configs/db.json");
const mysql = require("mysql");
const pool = require("./configs/pool");
const { notifyLine } = require("./shared/notify/line");
const { format } = require('date-fns');

require("./configs/express")(app);
require("./routes")(app);
app.listen(APP_CONFIG.port, () => {
  console.log(`Server is running on port ${APP_CONFIG.port}.`);
});

