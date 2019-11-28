var express = require('express');
var router = express.Router();

var controller = require('../controllers/graph');


router.get('/', function(req, res, next) {
    res.render('graph', { title: 'Express Warehouse' });
});

router.post('/get_stock_data', controller.get_stock);


module.exports = router;
