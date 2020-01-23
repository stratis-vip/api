const mainConfig = require("./config");
const db = require("./db");
let pool = null;
const { crypt } = require("../scripts/auth");
const {
  createResponse,
  createFail,
  createError,
  status
} = require("../models/apiFunctions");

module.exports = class User {
  constructor(config, name, email, pass) {
    this.id = null;
    this.error = null;
    this.name = name;
    this.email = email;
    this.pass = pass;
    if (config === null) {
      pool = new db(mainConfig);
    } else {
      pool = new db(config);
    }
  }

  save() {
    return new Promise(resolve => {
      if (checkIfUserIsValid(this)) {
        pool
          .query("INSERT INTO users (name, email, psy) VALUES (?, ?, ?)", [
            this.name,
            this.email,
            crypt(this.pass)
          ])
          .then(results => {
            resolveResponse(null, { status: status.success }, resolve);
          })
          .catch(err => resolveErrorResponse(err, resolve));
      } else {
        resolveFailResponse(
          `Δεν είναι πλήρη τα στοιχεία του μέλους: ${this.error}`,
          resolve
        );
      }
    });
  }

  getAllUsers() {
    return new Promise((resolve, reject) => {
      pool.query("SELECT id, name, email FROM users ", (err, result) => {
        if (!err) {
          let data = [];
          if (result.length !== 0) {
            for (let i = 0; i != result.length; i++) {
              data.push({
                id: parseInt(result[i].id),
                name: result[i].name,
                email: result[i].email,
                pass: null
              });
            }
          }
          resolveResponse(err, data, resolve);
        } else {
          reject(err);
        }
      });
    });
  }

  getUserById(id) {
    return new Promise((resolve, reject) => {
      if (isNaN(parseInt(id))) {
        resolveFailResponse(`'${id}' is not a number`, reject);
      } else {
        let queryString = "SELECT id, name, email FROM users WHERE id = ?";
        let finalId = id !== null ? parseInt(id) : parseInt(this.id);
        let data = [];
        pool
          .query(queryString, [finalId])
          .then(result => {
            if (result.length !== 0) {
              for (let i = 0; i != result.length; i++) {
                data.push({
                  id: parseInt(result[i].id),
                  name: result[i].name,
                  email: result[i].email,
                  pass: null
                });
              }
              resolveResponse(null, data, resolve);
            } else {
              resolveErrorResponse(`'Δεν υπάρχει μέλος με id = ${id}`, reject);
            }
          })
          .catch(err => {
            resolveResponse(err, data, resolve);
          });
      }
    });
  }

  deleteUserById(id) {
    return new Promise(resolve => {
      if (isNaN(parseInt(id))) {
        resolveFailResponse(`'${id}' is not a number`, resolve);
      } else {
        let finalId = parseInt(id);
        pool.query(
          "DELETE FROM users WHERE id = ?",
          [finalId],
          (err, results) => {
            let data = { rowsDelete: results.affectedRows };
            resolveResponse(err, data, resolve);
          }
        );
      }
    });
  }

  async close() {
    await pool.close();
  }

  update(id, name, email) {
    return new Promise(resolve => {
      if (isNaN(parseInt(id))) {
        resolveFailResponse(`'${id}' is not a number`, resolve);
      } else {
        let finalId = parseInt(id);
        if (name.trim().length === 0 || email.trim().length < 5) {
          let msg = createFail();
          msg.data.title = `Δεν δώθηκαν σωστά στοιχεία`;
          resolve(msg);
        } else {
          pool.query(
            "UPDATE users set name = ?, email = ? WHERE id = ?",
            [name, email, finalId],
            (err, results) => {
              const { affectedRows, changedRows } = results;
              let data = {
                rowsAffected: affectedRows,
                rowsUpdated: changedRows
              };
              resolveResponse(null, data, resolve);
            }
          );
        }
      }
    });
  }
};

const checkIfUserIsValid = user => {
  if (user.name.trim().length === 0) {
    user.error = "Μηδενικό μήκος ονόματος Μέλους";
    return false;
  } else {
    if (user.email.trim().length < 5) {
      user.error = `Η διεύθυνση email '${user.email}' είναι λανθασμένη'`;
      return false;
    } else {
      if (user.pass.trim().length < 5) {
        user.error = `Ο κωδικός ασφαλείας είναι πολύ μικρός (${user.pass.length} χαρακτήρες)'`;
        return false;
      }
    }
  }
  return true;
};

const resolveResponse = (err, dataObject, resolveFunction) => {
  let msg = createResponse(err);
  msg.data = dataObject;
  resolveFunction(msg);
};

const resolveFailResponse = (dataObject, resolveFunction) => {
  let msg = createFail();
  msg.data.title = dataObject;
  resolveFunction(msg);
};

const resolveErrorResponse = (dataObject, resolveFunction) => {
  let msg = createError();
  msg.data.title = dataObject;
  resolveFunction(msg);
};
