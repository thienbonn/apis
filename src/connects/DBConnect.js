const mysql = require('mysql2/promise');

const db = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: 'thientu234',
    database : 'expressct'
})

module.exports = db;