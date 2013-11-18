//Mocks
var categories = require('../mock/categories.json');

exports.list = function(req, res) {
  	res.json(categories);
}