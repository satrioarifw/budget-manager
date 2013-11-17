var express = require('express');
var app = express();

app.use(express.bodyParser());


var accounts = require('./mock/accounts.json');
var categories = require('./mock/categories.json');
var error = {"error": true, "message": "No data available."};


app.all('*', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});


//Get all accounts and compute balance.
app.get('/accounts', function(req, res) {
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

//Add new Account
app.post('/accounts', function(req, res) {
	var account 		= new Object();
	account.name 		= req.body.name;
	account.currency 	= req.body.currency;
	account.id 			= Math.ceil(Math.random() * 1000000); //TODO Change when integrated with MongoDB
	account.balance 	= 0;
	account.records		= [];

	accounts.push(account);
	res.json(200, {id:account.id});
});

//Delete Account
app.delete('/accounts/:id', function(req, res) {
	for(var accountKey in accounts) {
		if (accounts[accountKey].id == req.params.id) {
			accounts.splice(accountKey, 1);
			res.send(200);
		}
	}

	res.json(404, error);
});

//Get specific account
app.get('/accounts/:id', function(req, res) {
	for(var accountKey in accounts) {
		if (accounts[accountKey].id == req.params.id) {
			res.json(accounts[accountKey]);
		}
	}

	res.json(404, error);
});

//Add new Record
app.post('/accounts/records', function(req, res) {
	var record 			= new Object();
	record.amount 		= req.body.amount;
	record.category 	= req.body.category;
	record.date			= req.body.date;
	record.description 	= req.body.description;
	record.is_expense	= req.body.is_expense;
	record.id 			= Math.ceil(Math.random() * 1000000); //TODO Change when integrated with MongoDB

	var account_id = req.body.account_id;

	for(var accountKey in accounts) {
		if (accounts[accountKey].id == account_id) {
			accounts[accountKey].records.push(record);
			res.json(200, {id:record.id});
		}
	}
});

//Delete Record
app.delete('/accounts/:accountId/records/:recordId', function(req, res) {
	for (var accountKey in accounts) {
		if (accounts[accountKey].id == req.params.accountId) {
			var records = accounts[accountKey].records;
			for (var recordKey in records) {
				if (records[recordKey].id == req.params.recordId) {	
					accounts[accountKey].records.splice(recordKey, 1);
					res.send(200);
				}
			}
		}
	}
	res.json(404, error);
});


//Get all categories
app.get('/categories', function(req, res) {
  	res.json(categories);
});

app.listen(3000);