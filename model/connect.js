const mysql = require('mysql'); 
const util = require('util'); 
const config = require('./db_config.json'); 

let pool = mysql.createPool(config); 


function getConnection(){
    return new Promise(function(resolve, reject){
        pool.getConnection(function(err, conn){
            resolve(conn); 
            reject(err); 
        })
    });
}

module.exports = getConnection; 