//Mocks
var categories = require('../mock/categories.json');
var error = {"error": true, "message": "No data available."};



exports.list = function(req, res) {
  	res.json(categories);
}