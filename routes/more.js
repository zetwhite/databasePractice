var express = require('express');
const getConnection = require('../model/connect'); 
var router = express.Router();

function sendMorePage(res, msg = {}){
  if(!msg.title)
    msg.title = 'More Search Question';  
  if(!msg.GENDATA)
    msg.GENDATA = ''; 
  if(!msg.MOSDATA)
    msg.MOSDATA = '';   
  if(!msg.FEQDATA)
    msg.FEQDATA = '';

  res.render('more', { 
    title: msg.title,
    GENDATA : msg.GENDATA, 
    MOSDATA : msg.MOSDATA, 
    FEQDATA : msg.FEQDATA, 
  });  
}

router.get('/', function(req, res, next) {
  sendMorePage(res, {});
})

router.get('/01', function(req, res){
    res.writeHead(302, {
        'Location': '/more'});
    res.end();
})

router.get('/02', function(req, res){
    res.writeHead(302, {
        'Location': '/more'});
    res.end();
})

router.get('/03', function(req, res){
    res.writeHead(302, {
        'Location': '/more'});
    res.end();
})



router.post('/01', function(req, res){

    var q = `SELECT Product.name AS name,  Product.productid AS id,  SUM(gender = 'm') AS m, SUM(gender = 'f') AS f, count(*) AS c \
    FROM Customer, Transition, Product \
    WHERE Transition.customername = Customer.name AND Transition.productid = Product.productid \
    GROUP BY Product.productid \ 
    HAVING SUM(gender='f') > SUM(gender='m') `; 

    getConnection()
    .then(function(conn){
        var exec = 
            conn.query(q, function(error, result){
                if(error){
                    console.log('sql log : ' + exec.sql); 
                }
                else{
                    sendMorePage(res, {GENDATA : result}); 
                }
            }); 
    })
    .catch(function(err){
        console.log('database connection error'); 
        console.log(err); 
    }); 
})


router.post('/02', function(req, res){
    var q = `SELECT Product.name, Freq.*
    FROM Product,  
        (
            SELECT Product.productid AS pid, SUM(Transition.price) AS cnt
            FROM Transition, Product
            WHERE Transition.productid = Product.productid and Transition.date < '${req.body.date}'
            GROUP BY Product.productid
            ORDER BY cnt DESC
            LIMIT ${req.body.num}
        ) Freq
    WHERE Product.productid = Freq.pid;`; 

    getConnection()
    .then(function(conn){
        var exec = 
            conn.query(q, function(error, result){
                if(error){
                    console.log('sql log : ' + exec.sql); 
                }
                else{
                    sendMorePage(res, {MOSDATA : result}); 
                }
            }); 
    })
    .catch(function(err){
        console.log('database connection error'); 
        console.log(err); 
    }); 
})

router.post('/03', function(req, res){
    var q = `SELECT DISTINCT Customer.name
    FROM Customer, Transition, Product 
    WHERE Transition.customername = Customer.name AND Transition.productid = Product.productid 
    GROUP BY Customer.name, Product.suppliername
    HAVING COUNT(*) >= ${req.body.num};`; 

    getConnection()
    .then(function(conn){
        var exec = 
            conn.query(q, function(error, result){
                if(error){
                    console.log('sql log : ' + exec.sql); 
                }
                else{
                    sendMorePage(res, {FEQDATA : result}); 
                }
            }); 
    })
    .catch(function(err){
        console.log('database connection error'); 
        console.log(err); 
    }); 
})


router.post('/product', function(req, res){
  b = req.body; 
  productDB.searchProduct(b.name, b.productID, b.supplier)
  .then(function(result){
    console.log(result); 
    sendresultPage(res, {
      title : 'product search result', 
      MOSDATA : result
    })
  })
  .catch((error)=>(console.log(error))); 
})


router.post('/transition', function(req, res){
  b = req.body; 
  transDB.searchTransition(b.transNumber, b.productID, b.price, b.date, b.custName)
  .then(function(result){
    console.log(result); 
    sendresultPage(res, {
      title : 'transaction search result', 
      FEQDATA : result
    })
  })
  .catch((error)=>(console.log(error))); 
})


module.exports = router;