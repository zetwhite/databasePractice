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

function buildConditions(params) {
    var conditions = [];
    var values = [];
    var conditionsStr;
  
    if ( params.name.length > 0) {
      conditions.push("name LIKE ?");
      values.push("%" + params.name + "%");
    }
  
    if ( params.productid.length > 0) {
      conditions.push("productid LIKE ?");
      values.push("%" + params.productid + "%" );
    }

    if ( params.suppliername.length > 0) {
        conditions.push("suppliername LIKE ?");
        values.push("%" + params.suppliername +"%");
    }
    return {
        where: conditions.length ?
                 conditions.join(' AND ') : '1',
        values: values
      };
}

async function search(name, pid, sname){
    var data = {name : name, productid : pid, suppliername : sname}; 
    condition = buildConditions(data); 
    var sql = "select * from Product where " + condition.where; 
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

module.exports.searchProduct = search; 
module.exports.insertProduct = insert; 