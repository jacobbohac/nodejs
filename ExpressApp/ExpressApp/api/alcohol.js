var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'QWEiop123890!',   
    port : '3333'
});

connection.connect();
connection.query("use nodedb");

module.exports = router;

var DataViewModel = function (data){
    this.date = data.date;
    this.amount = data.amount;
}

var DataListViewModel = function (){
    this.dataItems = [];
}

/* GET records from database page. */
router.get('/', function (req, res) {
    
    var strQuery = "select * from alcohol_purchases";    
    var dbRecords = new DataListViewModel();

    connection.query(strQuery, function (err, rows) {        
        if (err) {
            throw err;
        } else {
            var index, len;
            for (index = 0, len = rows.length; index < len; ++index) {
                dbRecords.dataItems.push(new DataViewModel({ date: rows[index].date, amount: rows[index].amount }));                
            }
        }
        
        console.log(dbRecords);
        res.json(200, dbRecords);
    });   
});

/* POST a record to the database. */
router.post('/', function (req, res) {
    console.log(req);
    console.log(req.body.date);
    console.log(req.body.amount);
    var strQuery = 'insert into alcohol_purchases values ("' + req.body.date + '", ' + req.body.amount + ')';
    console.log(strQuery);
    connection.query(strQuery, function (err, rows) {
        if (err) {
            console.log("err while posting data");
        } else {
            console.log("data was posted successfully");
            res.json(200);
        }
    });
});