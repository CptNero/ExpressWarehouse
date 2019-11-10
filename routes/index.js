var express = require('express');
var router = express.Router();

let db_operations = require('../db/operations');
let db_queries = require('../db/queries');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Warehouse' });
});


router.post('/submit', db_operations.submit_product);
//router.post('/queryclick', db_queries.query_products);

module.exports = router;
