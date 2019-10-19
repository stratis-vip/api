async function f() {
  return 1;
}

// f().then(a=>console.log(a))

class Er {
  check() {
    return new Promise(res => {
      setTimeout(() => {
        res(5);
      }, 1000);
    });
  }

  async id() {
    await this.check(ref => console.log(ref));
    return b;
  }
}

let b = new Er();
async () => {
  let c;
  await b.check(ref => (c = ref));

  console.log(c);
};
console.log(b.id());

const axios = require("axios").default;

async function getApi() {
  return await axios.get(
    "http://localhost:9000/api/?secret=secretvalue"
  );
};

(async ()=> {
    const res = await getApi()
    console.log (res.data)})()

//console.log(brt)