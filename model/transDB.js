const getConnection = require('./connect');


function insert(tn, pid, price, date, cname, callback){
    var data = {
        transitionid : tn, 
        productid : pid,
        price : price, 
        date : date, 
        customername : cname
    }; 
    getConnection((conn) =>{
        var exec = conn.query('insert into Transition set ?', data, function(error, result){
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

module.exports.inserTransition = insert; 