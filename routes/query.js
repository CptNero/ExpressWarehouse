var express = require('express');
var router = express.Router();

let db_queries = require('../db/queries');

router.get('/', function(req, res, next) {
    res.render('query', { title: 'Express Warehouse' });
});

router.post('/query_all_click', db_queries.query_all_products);
router.post('/query_outofstock_click', db_queries.query_outofstock_products);
router.post('/query_pos_click', db_queries.query_positionof_products);
router.post('/query_full_shelves_click', db_queries.query_full_shelves);
router.post('/query_sector_categories_click', db_queries.query_sector_categories);
router.post('/query_warehouse_click', db_queries.query_warehouse);
router.post('/query_cooled_warehouse_click',db_queries.query_cooled_warehouse);
router.post('/query_secured_warehouse_click',db_queries.query_secured_warehouse);


module.exports = router;