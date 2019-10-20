require('dotenv').config()


const config ={
  connectionLimit : 10,
  host: "localhost",
  port: 3306,
  user: process.env.DB_USER || "",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "",
  insecureAuth: true
}

module.exports = config
