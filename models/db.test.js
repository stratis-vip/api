const DB = require('./db')



it('check DB creation',async () => {
    let db = null
    expect(db).toBe(null)
    db = new DB()
    expect(db).not.toBe(null)
    expect(db.poolReady).toBeFalsy()
    await db.connect()
    .catch(er => console.log(er))
    .then(pool => console.log('Pool object = '+ pool))
    expect(db.poolReady).toBeTruthy()
    await db.query('SELECT DATABASE()').then(data => console.log('QUERY RETURNS '+JSON.stringify(data)))
    .catch(er => console.log(er))
    console.log(db.database())
    await db.close()
    .then(console.log('RELEASED POOL'))
    .catch(er => console.log(er))
})