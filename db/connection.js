var mysql = require('mysql');
let con;

exports.initiate_connection = function () {
    con = mysql.createConnection({
        host: "eu-cdbr-west-02.cleardb.net",
        user: "be396ba67eb2ac",
        password: "1d48042b",
        database: "heroku_0d26917172e1d72"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
};

exports.get_con = function () {
    return con;
};