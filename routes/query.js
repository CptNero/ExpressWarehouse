var express = require('express');
var router = express.Router();

let db_queries = require('../db/queries');

router.get('/', function(req, res, next) {
    res.render('query', { title: 'Express Warehouse' });
});

router.post('/query_all_click', db_queries.query_all_products);
router.post('/query_outofstock_click', db_queries.query_outofstock_products);
router.post('/query_pos_click', db_queries.query_positionof_products);


module.exports = router;