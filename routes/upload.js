var express = require('express');
var multer = require('multer'); 
var path = require('path'); 
var fs = require('fs'); 
const { runInNewContext } = require('vm');
var router = express.Router();

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


router.post('/', upload.single('datafile'), function(req, res){
    if(req.fileValidationError){
        res.render('index', { 
            title: '[ database hw2 ]',
            uploadResult : 'file format error : must be .csv file' 
          });
    }

    var dataFile = req.file; 
    res.render('index', { 
        title: '[ database hw2 ]',
        uploadResult : 'upload success' 
      });
    console.log(dataFile); 
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { 
      title: '[ database hw2 ]',
      uploadResult : '' 
    });
});

module.exports = router;