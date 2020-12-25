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

module.exports.inserTransition = insert; 