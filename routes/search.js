var express = require('express');
var customerDB = require('../model/customerDB'); 
var productDB = require('../model/productDB'); 
var transDB = require('../model/transDB'); 
var router = express.Router();

function sendresultPage(res, msg = {}){
  if(!msg.title)
    msg.title = '';  
  if(!msg.CDATA)
    msg.CDATA = ''; 
  if(!msg.PDATA)
    msg.PDATA = '';   
  if(!msg.TDATA)
    msg.TDATA = '';

  res.render('searchResult', { 
    title: msg.title,
    CDATA : msg.CDATA, 
    PDATA : msg.PDATA, 
    TDATA : msg.TDATA, 
  });  
}

router.get('/', function(req, res, next) {
  res.render('search');
});

router.post('/customer', function(req, res){
  b = req.body; 
  customerDB.searchCustomer(b.name, b.phone, b.address, b.gender)
  .then(function(result){
    console.log(result); 
    console.log("sucess to search!"); 
    sendresultPage(res, {
      title : 'customer search result',
      CDATA : result 
    }); 
  }) 
  .catch((error)=>(console.log(error))); 
})


router.post('/product', function(req, res){
  b = req.body; 
  productDB.searchProduct(b.name, b.productID, b.supplier)
  .then(function(result){
    console.log(result); 
    sendresultPage(res, {
      title : 'product search result', 
      PDATA : result
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
      TDATA : result
    })
  })
  .catch((error)=>(console.log(error))); 
})


module.exports = router;