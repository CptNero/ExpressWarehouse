let db = require('../db/connection');

exports.get_stock = function(req,res,next){
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
}