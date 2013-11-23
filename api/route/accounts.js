//Mocks
var accounts = require('../mock/accounts.json');

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
	if (req.body.name === undefined || req.body.currency === undefined) {
		return res.json(400, {message:"Bad Data"});
	}

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
	if (req.params.id === undefined || isNaN(Number(req.params.id))) {
		return res.json(400, {message:"Bad Data"});
	}

	var accountId = req.params.id;

	for(var accountKey in accounts) {
		if (accounts[accountKey].id == accountId) {
			accounts.splice(accountKey, 1);
			return res.send(200);
		}
	}

	res.json(400, {message:"Bad Data"});
};

exports.detail = function(req, res) {
	if (req.params.id === undefined || isNaN(Number(req.params.id))) {
		return res.json(400, {message:"Bad Data"});
	}
	
	var accountId = req.params.id;

	for(var accountKey in accounts) {
		if (accounts[accountKey].id == accountId) {
			return res.json(accounts[accountKey]);
		}
	}

	res.json(400, {message:"Bad Data"});
};

