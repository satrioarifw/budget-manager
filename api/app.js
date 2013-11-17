var express = require('express');
var app = express();

var accounts = require('./mock/accounts.json');
var categories = require('./mock/categories.json');
var error = {"error": true, "message": "No data available."};

app.get('/accounts', function(req, res) {
	res.header('Access-Control-Allow-Origin', "http://localhost");

	for (var accountKey in accounts) {
		var balance = 0.0;
		for (var recordKey in accounts[accountKey].records) {
			if (accounts[accountKey].records[recordKey].is_expense) {
				balance -= accounts[accountKey].records[recordKey].amount;
			}
			else {
				balance += accounts[accountKey].records[recordKey].amount;
			}
		}
		accounts[accountKey].balance = balance;
	}

  	res.json(accounts);
});

app.get('/accounts/:id', function(req, res) {
	res.header('Access-Control-Allow-Origin', "http://localhost");

	for(var accountKey in accounts) {
		if (accounts[accountKey].id == req.params.id) {
			res.json(accounts[accountKey]);
		}
	}

	res.json(error);
});

app.get('/categories', function(req, res) {
	res.header('Access-Control-Allow-Origin', "http://localhost");
	
  	res.json(categories);
});

app.listen(3000);