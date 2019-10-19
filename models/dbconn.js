require('dotenv').config()
const mysql = require("mysql");
let Cons = []

const pool  = mysql.createPool({
  connectionLimit : 10,
  host: "db22.papaki.gr",
  port: 3306,
  user: process.env.DB_USER || "",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "",
  insecureAuth: true
});

// pool.on('acquire', function (connection) {
//   console.log('Connection %d acquired', connection.threadId);
//   Cons.push(connection.threadId)
//   console.log(Cons)
// });

// pool.on('release', function (connection) {
//   console.log('Connection %d released', connection.threadId);
//   Cons=Cons.filter(val => val != connection.threadId)
//   console.log(Cons)
// });

module.exports = pool
