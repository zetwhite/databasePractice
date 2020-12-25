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


function uploadArr(arr){
  let c = 0; 
  let p = 0; 
  let t = 0; 

  for(let i = 0; i < arr.length; i++){
    if(arr[i][0] == 'C'){
      let gender = 'f'; 
      if(arr[i][0].match(/[M]/g))
        gender = 'm'; 
        customerDB.insertCustomer(arr[i][1], arr[i][2], arr[i][3], gender, function(error, result){
        if(error)
          console.log(error); 
        else
          c++; 
      }); 
    }
    else if(arr[i][0] == 'P'){
        productDB.insertProduct(arr[i][1], arr[i][2], arr[i][3], function(error, result){
        if(error)
          console.log(error); 
        else 
          p++; 
      })
    }
    else if(arr[i][0] == 'T'){
        transDB.inserTransition(arr[i][1], arr[i][2], arr[i][3], arr[i][4], arr[i][5], function(error, result){
        if(error)
          console.log(error); 
        else 
          t++; 
      })
    }
  }
  return {
    c, p, t
  }; 
}


router.post('/', upload.single('datafile'), async function(req, res){
    if(req.fileValidationError){
        sendInsertPage(res, {uploadResult : 'file format must be .csv'}); 
    }
    let dataFile = req.file; 
    console.log(dataFile); 

    let arr = fs.readFileSync(dataFile.path).toString().split('\n').map(e=>e.split(',')); 
    console.log(arr); 
    let {c, p, t} = await uploadArr(arr); 
    console.log(c, p, t); 
    sendInsertPage(res, {
      uploadResult : 'success to insert ' + c + ' customers and' + p + 'products and ' + t + ' transitions'
    })
});


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { 
      title: '[ database hw2 ]',
      uploadResult : '' 
    });
});

module.exports = router;