//Mocks
var accounts = require('../mock/accounts.json');
var error = {"error": true, "message": "No data available."};

exports.create = function(req, res) {
	var record 			= new Object();
	record.amount 		= req.body.amount;
	record.category 	= req.body.category;
	record.date			= req.body.date;
	record.description 	= req.body.description;
	record.is_expense	= req.body.is_expense;
	record.id 			= Math.ceil(Math.random() * 1000000); //TODO Change when integrated with MongoDB

	var accountId = req.params.accountId;

	for(var accountKey in accounts) {
		if (accounts[accountKey].id == accountId) {
			accounts[accountKey].records.push(record);
			res.json(200, {id:record.id});
		}
	}
};

exports.delete = function(req, res) {
	var accountId = req.params.recordId;
	for (var accountKey in accounts) {
		if (accounts[accountKey].id == req.params.accountId) {
			var records = accounts[accountKey].records;
			for (var recordKey in records) {
				if (records[recordKey].id == accountId) {	
					accounts[accountKey].records.splice(recordKey, 1);
					res.send(200);
				}
			}
		}
	}
	res.json(404, error);
};

