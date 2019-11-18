let db = require('../db/connection');

exports.query_all_products = function(req, res, next){
    db.initiate_connection();
    let con = db.get_con();
    let statement = "SELECT * FROM product_item ORDER BY product_name ASC";
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
    let statement = "SELECT * from product_item where quantity = 0 ORDER BY product_name ASC";
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

exports.query_positionof_products = function(req,res,next){
    db.initiate_connection();
    let con = db.get_con();
    let statement =
        "SELECT product_item.product_name, warehouse.warehouse_name, warehouse.warehouse_id, sectors.sector_id, shelves.shelf_id, product_item.stored_at_row, product_item.stored_at_column\n" +
        "from product_item, shelves, sectors, warehouse\n" +
        "where product_item.shelf_id = shelves.shelf_id and\n" +
        "shelves.sector_id = sectors.sector_id and\n" +
        "sectors.warehouse_id = warehouse.warehouse_id ORDER BY warehouse_name ASC";
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

exports.query_full_shelves = function(req,res,next){
    db.initiate_connection();
    let con = db.get_con();
    let statement = "SELECT warehouse_name, shelves.shelf_id, shelves.is_full from product_item,sectors, warehouse, shelves\n" +
        "WHERE product_item.shelf_id = shelves.shelf_id and\n" +
        "shelves.sector_id = sectors.sector_id and\n" +
        "sectors.warehouse_id = warehouse.warehouse_id and\n" +
        "shelves.is_full = (Select MAX(shelves.is_full) FROM  shelves)\n" +
        "GROUP BY shelves.is_full;\n";

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

exports.query_sector_categories = function(req,res,next){
    db.initiate_connection();
    let con = db.get_con();
    let statement = "SELECT warehouse_name, sectors.sector_id, sectors.product_category\n" +
        "FROM product_item,sectors, warehouse, shelves\n" +
        "WHERE product_item.shelf_id = shelves.shelf_id and\n" +
        "shelves.sector_id = sectors.sector_id and\n" +
        "sectors.warehouse_id = warehouse.warehouse_id\n";

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

exports.query_warehouse = function(req,res,next){
    db.initiate_connection();
    let con = db.get_con();
    let statement =
        "SELECT serial_id, product_name, SUM(quantity) AS quantity, SUM(units_sold) AS units_sold " +
        "FROM product_item, shelves, sectors, warehouse, warehouse_cooled, warehouse_secured " +
        "WHERE product_item.shelf_id = shelves.shelf_id and " +
        "shelves.sector_id = sectors.sector_id and " +
        "sectors.warehouse_id = warehouse.warehouse_id and " +
        "warehouse.warehouse_id != warehouse_cooled.warehouse_id and " +
        "warehouse.warehouse_id != warehouse_secured.warehouse_id " +
        "GROUP BY product_name";

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

exports.query_cooled_warehouse = function(req,res,next){
    db.initiate_connection();
    let con = db.get_con();
    let statement =
        "SELECT serial_id, product_name, SUM(quantity) AS quantity, SUM(units_sold) AS units_sold\n" +
        "from product_item, shelves, sectors, warehouse\n" +
        "INNER JOIN\n" +
        "warehouse_cooled wc on warehouse.warehouse_id = wc.warehouse_id \n" +
        "WHERE product_item.shelf_id = shelves.shelf_id and\n" +
        "shelves.sector_id = sectors.sector_id and\n" +
        "sectors.warehouse_id = warehouse.warehouse_id\n" +
        "GROUP BY product_name\n";
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

exports.query_secured_warehouse = function(req,res,next){
    db.initiate_connection();
    let con = db.get_con();
    let statement =
        "SELECT serial_id, product_name, SUM(quantity) AS quantity, SUM(units_sold) AS units_sold\n" +
        "from product_item, shelves, sectors, warehouse\n" +
        "INNER JOIN\n" +
        "warehouse_secured ws on warehouse.warehouse_id = ws.warehouse_id\n" +
        "WHERE product_item.shelf_id = shelves.shelf_id and\n" +
        "shelves.sector_id = sectors.sector_id and\n" +
        "sectors.warehouse_id = warehouse.warehouse_id\n" +
        "GROUP BY product_name\n";
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

