var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
    { 
      title: '[ database hw2 ]',
      uploadResult : '' 
    }
  );
});

module.exports = router;