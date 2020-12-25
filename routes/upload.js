var express = require('express');
var multer = require('multer'); 
var path = require('path'); 
var fs = require('fs'); 
var customerDB = require('../model/customerDB'); 
var productDB = require('../model/productDB'); 
var transDB = require('../model/transDB'); 
const { send } = require('process');
const { json } = require('body-parser');
const { connect } = require('http2');
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

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/data/') 
    }, 
    filename: function (req, file, cb) {
      cb(null, Date.now() + ".csv")
    }
}); 


var upload = multer({ 
    storage: storage, 
    fileFilter : function(req, file, cb){; 
    if (file.mimetype != 'text/csv') {
        req.fileValidationError = 'wrong type';    
        return cb(null, false, new Error("file format Error")); 
    }
    else 
        return cb(null, true); 
    }
}); 


async function update(info){
  return new Promise(function(resolve){
    if(info[0] == 'C'){
      let gender = 'f'; 
      if(info[4].match(/[M]/g))
        gender = 'm'; 
      customerDB.insertCustomer(info[1], info[2], info[3], gender)
      .then(function(result){
        resolve('C');  
      })
      .catch((err)=>resolve('z')); 
    }
    else if(info[0] == 'P'){
      productDB.insertProduct(info[1], info[2], info[3])
      .then(function(result){
        resolve('P'); 
      })
      .catch((err)=>resolve('z')); 
    }
    else if(info[0] == 'T'){
      info[3] = info[3].substring(1); 
      info[4] = info[4].split('/').reverse().join("-"); 
      transDB.inserTransition(info[1], info[2], parseFloat(info[3]), info[4], info[5])
      .then(function(result){
        resolve('T')
      })
      .catch((err)=>resolve('z')); 
    }
  }); 
}


router.post('/', upload.single('datafile'), async function(req, res){
    if(req.fileValidationError){
        sendInsertPage(res, {uploadResult : 'file format must be .csv'}); 
    }
    let dataFile = req.file; 
    console.log(dataFile); 

    let arr = fs.readFileSync(dataFile.path).toString().split('\n')
    .map(e=>e.trim()).map(e=>e.split(',').map(e=>e.trim())); 
    console.log(arr); 
    let c = 0 ; 
    let p = 0; 
    let t = 0; 
    for(let i = 0; i < arr.length; i++){
      console.log(arr[i]); 
      temp = await update(arr[i])
      .then(function(ret){
        console.log(ret); 
        if(ret ==='C') c++; 
        if(ret ==='T') t++; 
        if(ret ==='P') p++; 
      })
    } 
    console.log(c, p, t); 
    sendInsertPage(res, {
      uploadResult : 'success to insert ' + c + ' customers and ' + p + ' products and ' + t + ' transactions'
    })
})


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { 
      title: '[ database hw2 ]',
      uploadResult : '' 
    });
});

module.exports = router;