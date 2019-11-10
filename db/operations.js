let db = require('../db/connection');


exports.submit_product = function (req, res, next) {
    db.initiate_connection();
    var shelf_id = req.body.shelf_id;
    var product_name = req.body.product_name;
    var row_number = req.body.stored_at_row;
    var column_number = req.body.stored_at_column;
    var amount = req.body.quantity;
    var cooled_or_guarded = req.body.cooled_or_guarded;
    var is_cooled = 0;
    var is_guarded = 0;

    if(cooled_or_guarded === 'cooled') {
        is_cooled = 1;
    }
    else if(cooled_or_guarded === 'guarded'){
        is_guarded = 1;
    }

    var year =    new Date().getFullYear();
    var month = new Date().getMonth();
    var day = new Date().getDay();
    var hour = new Date().getHours();
    var minute = new Date().getMinutes();

    let con = db.get_con();
    var statement = `INSERT INTO product_item (shelf_id, product_name, stored_at_row, stored_at_column, year, month, day, hour, minute, quantity, is_cooled, is_guarded)` +
        ` VALUES (${shelf_id}, '${product_name}', ${row_number}, ${column_number}, ${year}, ${month}, ${day}, ${hour}, ${minute}, ${amount}, ${is_cooled}, ${is_guarded})`;

    con.query(statement, function (err, result){
            if (err) throw err;
            console.log("Inserted record!");
    });


    con.end(function (err) {
        if(err) throw err;
        console.log("Disconnected!");
    });
};