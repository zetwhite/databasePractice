const pool = require('./connect');


async function insert(name, pid, supplier, callback){
    var data = {name : name, productid : pid, suppliername : supplier }; 
    var result = pool.query
    getConnection((conn) =>{
        var exec = conn.query('insert into Product set ?', data, function(error, result){
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

module.exports.insertProduct = insert; 