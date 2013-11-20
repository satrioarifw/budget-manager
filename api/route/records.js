//Mocks
var accounts = require('../mock/accounts.json');

exports.create = function(req, res) {
	if (req.body.amount === undefined || isNaN(Number(req.body.amount)) || req.body.category === undefined || req.body.date === undefined
		|| req.body.is_expense === undefined || req.params.accountId === undefined) {
		return res.json(400, {message:"Bad Data"});
	}

	var record = new Object();
	record.amount = req.body.amount;
	record.category	= req.body.category;
	record.date	= req.body.date;
	record.description = req.body.description;
	record.is_expense = req.body.is_expense;
	record.id = Math.ceil(Math.random() * 1000000); //TODO Change when integrated with MongoDB

	var accountId = req.params.accountId;

	for(var accountKey in accounts) {
		if (accounts[accountKey].id == accountId) {
			accounts[accountKey].records.push(record);
			return res.json(200, {id:record.id});
		}
	}

	res.json(400, {message:"Bad Data"});
};

exports.delete = function(req, res) {
	if (req.params.accountId === undefined || req.params.recordId === undefined) {
		return res.json(400, {message:"Bad Data"});
	}

	var recordId = req.params.recordId;
	var accountId = req.params.accountId;

	for (var accountKey in accounts) {
		if (accounts[accountKey].id == accountId) {
			var records = accounts[accountKey].records;
			for (var recordKey in records) {
				if (records[recordKey].id == recordId) {	
					accounts[accountKey].records.splice(recordKey, 1);
					return res.send(200);
				}
			}
		}
	}
	res.json(400, {message:"Bad Data"});
};

