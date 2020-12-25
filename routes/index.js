var express = require('express');
const getConnection = require('../model/connect'); 
var fs = require('fs'); 
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
      title: '[ database hw2 ]',
      delResult : '' 
  });
});

router.get('/delete', function(req, res){
  res.writeHead(302, {
    'Location': '/'});
  res.end();
})

router.post('/delete', function(req, res){
  var q = `delete from Transition; delete from Customer; delete from Product;`; 

  getConnection()
  .then(function(conn){
      conn.query(q, function(error, result){
        if(error){
          console.log('sql log : ' + exec.sql); 
        }
        else{
          res.render('index', { 
            title: '[ database hw2 ]',
            delResult : 'sucessfully delete all data' 
          });
        }  
      });
    })
  .catch(function(err){
      console.log('database connection error'); 
      console.log(err); 
  }); 
})

module.exports = router;