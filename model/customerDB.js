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

function buildConditions(params) {
    var conditions = [];
    var values = [];
    var conditionsStr;
  
    if ( params.name.length > 0) {
      conditions.push("name LIKE ?");
      values.push("%" + params.name + "%");
    }
  
    if ( params.phone.length > 0) {
      conditions.push("phone LIKE ?");
      values.push("%" + params.phone + "%" );
    }

    if ( params.address.length > 0) {
        conditions.push("address LIKE ?");
        values.push("%" + params.address +"%");
    }

    if ( params.gender.length > 0) {
        conditions.push("gender LIKE ?"); 
        values.push("%" + params.gender + "%");
    }
    
    return {
        where: conditions.length ?
                 conditions.join(' AND ') : '1',
        values: values
      };
}

async function search(name, phone, address, gender){
    var data = {name : name, phone : phone, address : address, gender : gender }; 
    condition = buildConditions(data); 
    var sql = "select * from Customer where " + condition.where; 
    console.log(sql); 

    return new Promise(function(resolve, reject){
        getConnection()
        .then(function(conn){
            var exec = conn.query(sql, condition.values, function(error, result){
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

module.exports.searchCustomer = search; 
module.exports.insertCustomer = insert; 