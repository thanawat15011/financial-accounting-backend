const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const db = require('./db.json');

const caCertPath = path.resolve(__dirname, '../certs/isrgrootx1.pem');

const pool = mysql.createPool({
    timezone: '+7:00',
    connectionLimit: 10,
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    user: '3pT5uyvVcU2Gg2Z.root',
    port: 4000,
    password: 'KFMH0RcTRMd4RGyq',
    database: db.base,
    charset: 'utf8mb4',
    acquireTimeout: 10000, 
    connectTimeout: 10000, 
    multipleStatements: true,
    ssl: {
        ca: fs.readFileSync(caCertPath)
    }
});

module.exports = pool;
