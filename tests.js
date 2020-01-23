function inter() {
  return new Promise(resolve => {
    let a = 'ert'
    setInterval(()=>resolve(a),1000)
    
  });
}

function er() {
  return new Promise((resolve, rejet) => {
    let str = inter()//.then(r => resolve(r));
    resolve( str)
  });
}
er().then(r=>console.log(r))
