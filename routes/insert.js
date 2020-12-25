var express = require('express');
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

  customerDB.insertCustomer(name, phone, address, gender)
  .then(function(result){
    sendInsertPage(res, {cResult:'success to insert customer :)'}); 
  })
  .catch(function(error){
    console.log(error); 
    sendInsertPage(res, {cResult:'fail to insert customer :('}); 
  }); 
})


router.post('/product', async function(req, res){
  productDB.insertProduct(req.body.name, req.body.productID, req.body.supplier)
  .then(function(result){
    sendInsertPage(res, {pReuslt: 'success to insert product :)'})
  })
  .catch(function(error){
    console.log(error); 
    sendInsertPage(res, {pReuslt : 'fail to insert product :('});  
  }); 
})


router.post('/transition', function(req, res){
  b = req.body; 
  transDB.inserTransition(b.transNumber, b.productID, b.price, b.date, b.custName)
  .then(function(result){
    sendInsertPage(res, {tResult : 'success to insert transition :)'}); 
  })
  .catch(function(error){
    console.log(error); 
    sendInsertPage(res, {tResult : 'fail to insert transition :('});  
  }); 
})

module.exports = router;