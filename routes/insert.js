var express = require('express');
var bodyParser = require('body-parser'); 
var customerDB = require('../model/customerDB'); 
var productDB = require('../model/productDB'); 
var transDB = require('../model/transDB'); 
var router = express.Router();

function sendInsertPage(res, msg = {}){
  if(!msg.uploadResult)
    msg.uploadResult = ''; 
  if(!msg.cResult)
    msg.cResult = ''; 
  if(!msg.pReuslt)
    msg.pReuslt = ''; 
  if(!msg.tResult) 
    msg.tResult = ''; 

  res.render('insert', { 
    title: '[ database hw2 ]',
    uploadResult : msg.uploadResult, 
    cresult : msg.cResult, 
    pResult : msg.pReuslt, 
    tResult : msg.tResult
  });  
}

/* GET home page. */
router.get('/', function(req, res) {
  sendInsertPage(res); 
})

router.get('/customer', function(req, res){
  sendInsertPage(res); 
})

router.get('/product', function(req, res){
  sendInsertPage(res); 
})

router.get('/transition', function(req, res){
  sendInsertPage(res); 
})


router.post('/customer', function(req, res, next){
  const name = req.body.name; 
  const phone = req.body.phone; 
  const address = req.body.address; 
  const gender = req.body.gender; 

  customerDB.insertCustomer(name, phone, address, gender, function(error, result){
    if(error || !result){
      console.log("fail to insert new user"); 
      console.log(error); 
      sendInsertPage(res, {cResult:'fail to insert customer :('}); 
    }
    else{
      console.log('success to insert into customer'); 
      sendInsertPage(res, {cResult:'success to insert customer :)'}); 
    }
  })
})

router.post('/product', function(req, res){
  productDB.insertProduct(req.body.name, req.body.productID, req.body.supplier, function(error, result){
    if(error||!result){
      console.log(error); 
      sendInsertPage(res, {pReuslt : 'fail to insert product :('}); 
    }
    else{
      sendInsertPage(res, {pReuslt: 'success to insert product :)'})
    }
  }); 
})

router.post('/transition', function(req, res){
  b = req.body; 
  transDB.inserTransition(b.transNumber, b.productID, b.price, b.date, b.custName, function(error, result){
    if(error || !result){
      console.log(error); 
      sendInsertPage(res, {tResult : 'fail to insert transition :('}); 
    }
    else{
      sendInsertPage(res, {tResult : 'success to insert transition :)'}); 
    }
  }); 
})

module.exports = router;