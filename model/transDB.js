const getConnection = require('./connect');


async function insert(tn, pid, price, date, cname){
    var data = {
        transitionid : tn, 
        productid : pid,
        price : price, 
        date : date, 
        customername : cname
    }; 
    return new Promise(function(resolve, reject){
        getConnection()
        .then(function(conn){
            var exec = conn.query('insert into Transition set ?', data, function(error, result){
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
  
    if ( params.transitionid.length > 0) {
      conditions.push("transitionid LIKE ?");
      values.push("%" + params.transitionid + "%" );
    }
    if ( params.productid.length > 0) {
        conditions.push("productid LIKE ?");
        values.push("%" + params.productid +"%");
    }

    if (params.price.length > 0) {
        conditions.push("price = ?");
        values.push(parseFloat(params.price));
    }
    if ( params.date.length > 0) {
        conditions.push("date LIKE ?"); 
        values.push("%" + params.date + "%");
    }
    if ( params.customername.length > 0) {
        conditions.push("customername LIKE ?");
        values.push("%" + params.customername + "%" );
    }
    return {
        where: conditions.length ?
                 conditions.join(' AND ') : '1',
        values: values
      };
}

async function search(tid, pid, price, dt, cname){
    var data = {transitionid : tid, productid : pid, price : price, date : dt, customername : cname }; 
    condition = buildConditions(data); 
    var sql = "select * from Transition where " + condition.where; 
    console.log(sql); 
    console.log(condition.values); 

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

module.exports.searchTransition = search; 
module.exports.inserTransition = insert; 