//Mocks
var accounts = require('../mock/accounts.json');
var error = {"error": true, "message": "No data available."};

exports.list = function(req, res) {
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
};

exports.create = function(req, res) {
	var account 		= new Object();
	account.name 		= req.body.name;
	account.currency 	= req.body.currency;
	account.id 			= Math.ceil(Math.random() * 1000000); //TODO Change when integrated with MongoDB
	account.balance 	= 0;
	account.records		= [];

	accounts.push(account);
	res.json(200, {id:account.id});
};

exports.delete = function(req, res) {
	for(var accountKey in accounts) {
		if (accounts[accountKey].id == req.params.id) {
			accounts.splice(accountKey, 1);
			res.send(200);
		}
	}

	res.json(404, error);
};

exports.detail = function(req, res) {
	for(var accountKey in accounts) {
		if (accounts[accountKey].id == req.params.id) {
			res.json(accounts[accountKey]);
		}
	}

	res.json(404, error);
};

