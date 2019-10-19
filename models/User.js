const pool = require("./dbconn");
const { crypt } = require("../scripts/auth");
const { createResponse, createFail } = require("../models/apiFunctions");

module.exports = class User {
  id;
  error = null;
  constructor(name, email, pass) {
    this.name = name;
    this.email = email;
    this.pass = pass;
  }

  save() {
    return new Promise(resolve => {
      if (checkIfUserIsValid(this)) {
        let msg = null;
        pool.query(
          "INSERT INTO users (name, email, psy) VALUES (?, ?, ?)",
          [this.name, this.email, crypt(this.pass)],
          (err, res) => {
            resolveResponse(err, { id: parseInt(res.insertId) }, resolve);
          }
        );
      } else {
        resolveFailResponse(`Δεν είναι πλήρη τα στοιχεία του μέλους: ${this.error}`, resolve)
      }
    });
  }

  getAllUsers() {
    return new Promise(resolve => {
      pool.query("SELECT id, name, email FROM users ", (err, result) => {
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
      });
    });
  }

  getUserById(id) {
    return new Promise(resolve => {
      if (isNaN(parseInt(id))) {
        resolveFailResponse(`'${id}' is not a number`, resolve)
      } else {
        let queryString = "SELECT id, name, email FROM users WHERE id = ?";
        let finalId = id !== null ? parseInt(id) :parseInt(this.id)
        pool.query(queryString,[finalId], (err, result) => {
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
          resolveResponse(err,data,resolve)
        });
      }
    });
  }

  deleteUserById(id) {
    return new Promise(resolve => {
      if (isNaN(parseInt(id))) {
        resolveFailResponse(`'${id}' is not a number`, resolve)
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

  update(id, name, email) {
    return new Promise(resolve => {
      if (isNaN(parseInt(id))) {
        resolveFailResponse(`'${id}' is not a number`, resolve)
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
              resolveResponse(err, data, resolve);
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
