let db = require('../db/connection');

exports.query_all_products = function(req, res, next){
    db.initiate_connection();
    let con = db.get_con();
    let statement = "SELECT * FROM product_item";
    con.query(statement,function (err, result, fields) {
        if(err) throw err;
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(JSON.stringify(result));
        console.log("Query successful!")
    });


    con.end(function (err) {
        if(err) throw err;
        console.log("Disconnected!");
    });
};

exports.query_outofstock_products = function(req,res,next){

    db.initiate_connection();
    let con = db.get_con();
    let statement = "SELECT * from product_item where quantity = 0";
    con.query(statement,function (err, result, fields) {
        if(err) throw err;
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(JSON.stringify(result));
        console.log("Query successful!")
    });

    con.end(function (err) {
        if(err) throw err;
        console.log("Disconnected!");
    });
}

exports.query_positionof_products = function(req,res,next){
    db.initiate_connection();
    let con = db.get_con();
    let statement =
        "SELECT product_item.product_name, warehouse.warehouse_name, warehouse.warehouse_id, sectors.sector_id, shelves.shelf_id, product_item.stored_at_row, product_item.stored_at_column\n" +
        "from product_item, shelves, sectors, warehouse\n" +
        "where product_item.shelf_id = shelves.shelf_id and\n" +
        "shelves.sector_id = sectors.sector_id and\n" +
        "sectors.warehouse_id = warehouse.warehouse_id";
    con.query(statement,function (err, result, fields) {
        if(err) throw err;
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(JSON.stringify(result));
        console.log("Query successful!")
    });

    con.end(function (err) {
        if(err) throw err;
        console.log("Disconnected!");
    });
}

