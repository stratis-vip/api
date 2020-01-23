require("dotenv").config();
const Database = require("./db");
const User = require("./User");
const { status } = require("./apiFunctions");
const { createUN } = require("random-string-lib");

const config = {
  connectionLimit: 10,
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "workouts_test",
  insecureAuth: true
};

const db = new Database(config);
// config.database = "workouts_test";
let user = new User(config);

beforeAll(async () => {
  // await db
  //   .query("CREATE DATABASE IF NOT EXISTS workouts_test")
  //   .catch(er => console.log(er));
  // await db.query("USE workouts_test").catch(er => console.log(er));
  // await db
  //   .query(
  //     `CREATE TABLE IF NOT EXISTS users (  id int NOT NULL AUTO_INCREMENT, name VARCHAR(30) NOT NULL, email VARCHAR(30) NOT NULL, psy VARCHAR(65) NOT NULL, PRIMARY KEY (id) ) ENGINE=InnoDB DEFAULT CHARSET=utf8`
  //   )
  //   // .then(r => console.log(`MUST BE FIRST ${JSON.stringify(r,null,2)}`))
  //   .catch(r => console.log(r));
  // await db.query(`INSERT INTO users ( name, email, psy) VALUES
  //   (  'stratis', 'stratis.vip@gmail.com', '$2b$10$bqCCN.MazAo0x81vdu/CN.o.7WPcjwvq13I6vzq9XFUtyBVECLx..'),
  //   (  'panagiotis', 'panagiotis@gmail.com', '$2b$10$bqCCN.MazAo0x81vdu/CN.o.7WPcjwvq13I6vzq9XFUtyBVECLx..'),
  //   (  'dimitris', 'dimitris@gmail.com', '$2b$10$bqCCN.MazAo0x81vdu/CN.o.7WPcjwvq13I6vzq9XFUtyBVECLx..'),
  //   (  'pantelis', 'pantelis@gmail.com', '$2b$10$bqCCN.MazAo0x81vdu/CN.o.7WPcjwvq13I6vzq9XFUtyBVECLx..'),
  //   (  'michalis', 'michalis@gmail.com', '$2b$10$bqCCN.MazAo0x81vdu/CN.o.7WPcjwvq13I6vzq9XFUtyBVECLx..'),
  //   (  'petra', 'petra@gmail.com', '$2b$10$bqCCN.MazAo0x81vdu/CN.o.7WPcjwvq13I6vzq9XFUtyBVECLx..')`);
});

describe("Δοκιμές στο API user", () => {
  // it("Δημιουργεί ένα νέο user", async () => {
  //   for (_ = 0; _ != 6; _++) {
  //     const un = createUN();
  //     const local = new User(config, un.username, un.email, un.password);
  //     let res = await local.save();
  //     //await local.close()
  //     expect(res.status).toBe(status.success);
  //   }
  // });

  it("db must have a table users", async () => {
    let res = await db.tableExists("users").catch(r => console.log(r));
    expect(res).toBeTruthy();
  });
  it("Db must be not null", () => {
    expect(db).not.toBeNull();
  });
  // it("Επιστρέφει το μέλος με id = 1", async () => {
  //   let res;
  //   await user
  //     .getUserById(1)
  //     .then((res = res.data[0]))
  //     .catch(r => console.log(r));
  //   expect(res.id).toBe(1);
  // }),
  // it("Δεν πρέπει να υπάρχει μέλος με id = 15", async () => {
  //   let res;
  //   await user.getUserById(15).catch(r => (res = r));
  //   expect(res.status).toBe(status.error);
  // }),
  it("Δεν πρέπει να υπάρχει μέλος με id = a", async () => {
    let res;
    await user.getUserById("a").catch(r => (res = r));
    expect(res.status).toBe(status.fail);
  });
  it("Όλα τα μέλη πρέπει να είναι 6", async () => {
    let res;
    await user
      .getAllUsers()
      .then((res = res.data))
      .catch(r => console.log(r));
    // res = res.data;
    console.log(res);
    expect(res.length).toBe(1);
  });
});

// beforeAll()
// beforeAll().catch((reason)=>console.log(reason))

afterAll(async () => {
  // await db
  //   .query("DROP TABLE IF EXISTS users")
  //   .catch(r => console.log(`ERROR CATCH AT ${JSON.stringify(r, null, 2)}`));
  // await db
  //   .query("DROP DATABASE IF EXISTS workouts_test")
  //   .catch(r => console.log(`ERROR CATCH AT ${JSON.stringify(r, null, 2)}`));
  // await db
  //   .close()
  //   .catch(r => console.log(`ERROR CATCH AT ${JSON.stringify(r, null, 2)}`));
  // await user
  //   .close()
  //   .catch(r => console.log(`ERROR CATCH AT ${JSON.stringify(r, null, 2)}`));
});
