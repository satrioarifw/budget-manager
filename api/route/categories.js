//Mocks
var categories = require('../mock/categories.json');

exports.list = function(req, res) {
  	res.json(categories);
}

exports.create = function(req, res) {
	if (req.body.name === undefined) {
		return res.json(400, {message:"Bad Data"});
	}

	var category = {};
	category.name = req.body.name;

	for (var categoryKey in categories) {
		if (categories[categoryKey].name == category.name) {
			return res.json(400, {message:"Bad Data"});
		}
	}

	//generate id
	category.id = Math.ceil(Math.random() * 1000000); //TODO Change when integrated with MongoDB

	categories.push(category);
	return res.json(200, category);
}

exports.delete = function(req, res) {
	if (req.params.categoryId === undefined) {
		return res.json(400, {message:"Bad Data"});
	}

	var categoryId = req.params.categoryId;
	for (var categoryKey in categories) {
		if (categories[categoryKey].id == categoryId) {
			categories.splice(categoryKey, 1);
			return res.send(200);
		}
	}

	//Delete from categories
	return res.send(400, {message:"Bad Data"});
}