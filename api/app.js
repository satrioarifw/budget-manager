var express = require('express');
var app = express();


var accounts = require('./mock/accounts.json');
var categories = require('./mock/categories.json');

app.get('/accounts', function(req, res) {
	res.header('Access-Control-Allow-Origin', "http://localhost");
  	res.json(accounts);
});

app.get('/accounts/:id', function(req, res) {
	res.header('Access-Control-Allow-Origin', "http://localhost");
  	res.json(accounts);
});

app.get('/categories', function(req, res) {
	res.header('Access-Control-Allow-Origin', "http://localhost");
  	res.json(categories);
});

app.listen(3000);