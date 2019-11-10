var express = require('express');
var router = express.Router();

let db_deletions = require('../db/deletions');

router.get('/', function(req, res, next) {
    res.render('delete', { title: 'Express Warehouse' });
});

router.post('/delete_by_name', db_deletions.deletion_by_name);
router.post('/delete_by_id', db_deletions.deletion_by_id);

module.exports = router;
