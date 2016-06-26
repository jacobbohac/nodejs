var express = require('express');
var router = express.Router();

var DataViewModel = function (data){
    this.date = data.date;
    this.amount = data.amount;
}

var DataListViewModel = function (){
    this.dataItems = [];
}

var dbRecords = new DataListViewModel();

/* GET records from database page. */
router.get('/', function (req, res) {
    /*res.json(200, [
        { date: "2016-06-25", amount: "14.00"},
    ]);
     */
    console.log(dbRecords);
    res.json(200, dbRecords);
    res.end();
});

module.exports = router;

var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'QWEiop123890!',   
    port : '3333'
});

connection.connect();

connection.query("use example");
var strQuery = "select * from alcohol";

connection.query(strQuery, function (err, rows) {
    if (err) {
        throw err;
    } else {
        console.log(rows);
        var index, len;
        for (index = 0, len = rows.length; index < len; ++index) {
            dbRecords.dataItems.push(new DataViewModel({ date: rows[index].date, amount: rows[index].amount }));
        }     
    }
});

connection.end(function(err){
// Do something after the connection is gracefully terminated.
});
