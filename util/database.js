const mysql = require('mysql2');

//becoz there are lot of querries use pool

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database:'appointmentdata',
    password: '10031998mysql@'
})

module.exports = pool.promise();