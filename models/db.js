const mysql = require("mysql");
const mConfig = require("./config");
class Database {
  constructor(config) {
    if (config === undefined)
      //default config
      config = mConfig;
    this.config = config;
    this.pool = null;
    this.poolReady = false;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.pool = mysql.createPool(this.config);
      if (this.pool != -null) {
        this.poolReady = true;
        resolve(this.pool);
      } else {
        let err = {
          message: "Δεν κατάφερα να κάνω το Pool"
        };
        reject(err);
      }
    });
  }

  async database(){
      await this.query('SELECT DATABASE()').then(er => {
        console.log("DATABASE() RETURNS "+er )  
        return er}).catch(er =>console.log(er))
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, args, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      if (this.poolReady) {
        this.pool.end(err => {
          if (err) {
            reject(err);
          } else {
            resolve({ status: "Closed Succesfully" });
          }
        });
      } else {
        reject({ status: "Have not Pool" });
      }
    });
  }

  tableExists(tbl) {
    return new Promise(resolve => {
      this.pool.query("SHOW TABLES LIKE ?", [tbl], (err, results) => {
        if (err) {
          resolve(err);
        } else {
          resolve(results.length === 1);
        }
      });
    });
  }
}

module.exports = Database;
