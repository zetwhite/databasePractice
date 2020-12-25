const getConnection = require('./connect');


function insert(name, phone, address, gender, callback){
    var data = {name : name, phone : phone, address : address, gender : gender }; 
    getConnection((conn) =>{
        var exec = conn.query('insert into Customer set ?', data, function(error, result){
            console.log('sql log : ' + exec.sql); 
            if(error){
                callback(error, null); 
            }
            else {
                callback(null, result); 
            }
        })
        conn.release(); 
        return ; 
    }); 
}

module.exports.insertCustomer = insert; 