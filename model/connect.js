const mysql = require('mysql'); 
const util = require('util'); 
const config = require('./db_config.json'); 

let pool = mysql.createPool(config); 

/*
function getConnection(callback){
    pool.getConnection(function(err, conn){
        if(!err){
            callback(conn); 
        }
    }); 
}
*/

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    
    if (connection) connection.release()
    
     return
})

pool.query = util.promisify(pool.query); 

module.exports = pool; 
//module.exports = getConnection; 