const getConnection = require('./connect');


async function insert(name, phone, address, gender){
    var data = {name : name, phone : phone, address : address, gender : gender }; 
    
    return new Promise(function(resolve, reject){
        getConnection()
        .then(function(conn){
            var exec = conn.query('insert into Customer set ?', data, function(error, result){
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
    })
}

module.exports.insertCustomer = insert; 