require("dotenv").config();
const Database = require("./db");
const User = require("./User");
const {status} = require('./apiFunctions')

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

let user = new User(config);

beforeAll(async () => {
  //await db.query("CREATE DATABASE workouts_test").catch((er)=>console.log(er))
  // await db.query("USE workouts_test").catch((er)=>console.log(er))
  await db
    .query(
      `CREATE TABLE users (  id int NOT NULL AUTO_INCREMENT, name VARCHAR(30) NOT NULL, email VARCHAR(30) NOT NULL, psy VARCHAR(65) NOT NULL, PRIMARY KEY (id) ) ENGINE=InnoDB DEFAULT CHARSET=utf8`
    )
    // .then(r => console.log(`MUST BE FIRST ${JSON.stringify(r,null,2)}`))
    .catch(r => console.log(r));
  //   await db.query(`INSERT INTO users (id, name, email, psy) VALUES
  //   (1,  'stratis', 'stratis.vip@gmail.com', '$2b$10$bqCCN.MazAo0x81vdu/CN.o.7WPcjwvq13I6vzq9XFUtyBVECLx..'),
  //   (2,  'panagiotis', 'panagiotis@gmail.com', '$2b$10$bqCCN.MazAo0x81vdu/CN.o.7WPcjwvq13I6vzq9XFUtyBVECLx..'),
  //   (3,  'dimitris', 'dimitris@gmail.com', '$2b$10$bqCCN.MazAo0x81vdu/CN.o.7WPcjwvq13I6vzq9XFUtyBVECLx..'),
  //   (4,  'pantelis', 'pantelis@gmail.com', '$2b$10$bqCCN.MazAo0x81vdu/CN.o.7WPcjwvq13I6vzq9XFUtyBVECLx..'),
  //   (5,  'michalis', 'michalis@gmail.com', '$2b$10$bqCCN.MazAo0x81vdu/CN.o.7WPcjwvq13I6vzq9XFUtyBVECLx..'),
  //   (6,  'petra', 'petra@gmail.com', '$2b$10$bqCCN.MazAo0x81vdu/CN.o.7WPcjwvq13I6vzq9XFUtyBVECLx..')`
  // )
});

describe("Δοκιμές στο API user", () => {
  test("Δημιουργεί ένα νέο user", async () => {
    const local = new User(config, "user1", "user1@mail.com", "user1pass");
    let res = await local.save();
    expect(res.status).toBe(status.success);
  });
});
// it("Επιστρέφει το μέλος με id = 1", async()=>{
//     let res = await user.getUserById(1).catch(r=>console.log(r))
//     res = res.data[0]
//     expect(res.id).toBe(1)
// }),
// it("Δεν πρέπει να υπάρχει μέλος με id = 15", async()=>{
//     let res
//     await user.getUserById(15).catch(r=>res=r)
//     expect(res.status).toBe('Error')
// }),
// it("Δεν πρέπει να υπάρχει μέλος με id = a", async()=>{
//     let res
//     await user.getUserById('a').catch(r=>res=r)
//     expect(res.status).toBe('Fail')
// })
//   it("Όλα τα μέλη πρέπει να είναι 6", async()=>{
//       let res = await user.getAllUsers().catch(r=>console.log(r))
//       res = res.data
//       expect(res.length).toBe(0)
//   })
// });
// beforeAll()
// beforeAll().catch((reason)=>console.log(reason))
test("db must have a table users", async () => {
  let res = await db.tableExists("users").catch(r => console.log(r));
  expect(res).toBeTruthy();
});
test("Db must be not null", () => {
  expect(db).not.toBeNull();
});

afterAll(async () => {
  await db
    .query("DROP TABLE users")
    .catch(r => console.log(`ERROR CATCH AT ${JSON.stringify(r, null, 2)}`));
  await db
    .close()
    .catch(r => console.log(`ERROR CATCH AT ${JSON.stringify(r, null, 2)}`));
  await user
    .close()
    .catch(r => console.log(`ERROR CATCH AT ${JSON.stringify(r, null, 2)}`));
});
