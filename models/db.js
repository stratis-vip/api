const mysql = require( 'mysql' );
const mConfig = require('./config')
class Database {
    constructor( config ) {
        if (config === undefined ) //default config
        config = mConfig
        this.pool = mysql.createPool( config );
    }
    query( sql, args ) {
        return new Promise(  resolve  => {
            this.pool.query( sql, args, ( err, rows ) => {
                if ( err )
                    return resolve( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( resolve => {
            this.pool.end( err => {
                if ( err )
                    return resolve( err );
                resolve({status: 'Closed Succesfully'});
            } );
        } );
    }

    tableExists(tbl){
        return new Promise(resolve => {
            this.pool.query('SHOW TABLES LIKE ?', [tbl], (err, results)=>{
                if (err){
                    resolve(err)
                } else {
                    resolve(results.length === 1)
                }
            })
        })
    }
}

module.exports = Database