let db = require('../db/connection');

exports.deletion_by_name = function (req,res,next) {
    db.initiate_connection();
    var statement = `DELETE FROM product_item WHERE product_item.product_name = ${req.body.delete_by_name}`;
    let con = db.get_con();

    con.query(statement, function (err, result){
        if (err) throw err;
        console.log("Deleted record!");
    });

    con.end(function (err) {
        if(err) throw err;
        console.log("Disconnected!");
    });
};

exports.deletion_by_id = function (req,res,next) {
    db.initiate_connection();
    var statement = `DELETE FROM product_item WHERE product_item.serial_id = ${req.body.delete_by_id}`;
    let con = db.get_con();

    con.query(statement, function (err, result){
        if (err) throw err;
        console.log("Deleted record!");
    });

    con.end(function (err) {
        if(err) throw err;
        console.log("Disconnected!");
    });

};