const getConnection = require('./connect');
const pool = require('./connect');


async function insert(name, pid, supplier){
    var data = {name : name, productid : pid, suppliername : supplier }; 
    
    return new Promise(function(resolve, reject){
        getConnection()
        .then(function(conn){
            var exec = conn.query('insert into Product set ?', data, function(error, result){
                if(error){
                    console.log('sql log : ' + exec.sql); 
                    reject(error); 
                }
                else{
                    resolve(result); 
                }
            })
            conn.release(); 
        })
        .catch(function(err){
            console.log("database connection error"); 
        }); 
    }); 
}

module.exports.insertProduct = insert; 