require('dotenv').config()


const config ={
  connectionLimit : 10,
  host: process.env.DB_HOST || 'db22.papaki.gr',
  port: 3306,
  user: process.env.DB_USER || "",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "",
  insecureAuth: true
}

module.exports = config
