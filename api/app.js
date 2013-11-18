var express = require('express');
var app = express();

//Route
var routes = {};
routes.accounts = require('./route/accounts.js');
routes.records = require('./route/records.js');
routes.categories = require('./route/categories.js');

//MongoDB
var MongoClient = require('mongodb').MongoClient
var format = require('util').format;    

app.use(express.json());
app.use(express.urlencoded());

app.all('*', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});


//Get all accounts and compute balance.
app.get('/accounts', routes.accounts.list);

//Create new Account
app.post('/accounts', routes.accounts.create);

//Delete Account
app.delete('/accounts/:id', routes.accounts.delete);

//Get specific account
app.get('/accounts/:id', routes.accounts.detail);

//Create new Record
app.post('/accounts/:accountId/records', routes.records.create);

//Delete Record
app.delete('/accounts/:accountId/records/:recordId', routes.records.delete);

//Get all categories
app.get('/categories', routes.categories.list);

console.log('Budget Manager Node.js server starts..');
app.listen(3000);