require('dotenv').config();

var express = require('express');
var app = express();
var Food = require('./food');
// var User = require('./user');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 1. GET /api/all
//    displays all foods
app.get('/api/all', function(request, response) {
	Food.fetchAll().then(function(foods) {
		response.json({
			foods: foods
		});
	});
});

// 2. GET /api/category/:id
//    displays food by category
app.get('/api/category/:id', function(request, response) {
	Food
	.where('category_id', request.params.id)
	.fetchAll()
	.then(function(food) {
		response.json({
			food: food
		});
	}, function() {
		response.json({
			error: "That category doesn't exist!"
		});
	});
});

// 2. GET /api/thermal/:id
//    displays food by thermal type
app.get('/api/thermal/:id', function(request, response) {
	Food
	.where('thermal_id', request.params.id)
	.fetchAll()
	.then(function(food) {
		response.json({
			food: food
		});
	}, function() {
		response.json({
			error: "That thermal type doesn't exist!"
		});
	});
});

// 4. GET /api/:id
//    displays a single food
app.get('/api/:id', function(request, response) {
	Food
	.where('id', request.params.id)
	.fetch({require: true, withRelated: ['category', 'thermal']})
	.then(function(food) {
		response.json({
			food: food
		});
	}, function() {
		response.json({
			error: "That food doesn't exist!"
		});
	});
});

// 4. POST /api/all
// 	  create a new entry
app.post('/api/all', function(request, response) {
	// creating a new food
	var food = new Food({
		name: request.body.name,
		category_id: request.body.category_id,
		thermal_id: request.body.thermal_id,
		image: request.body.image
	});

	// saving it and posting it
	food.save().then(function() {
		response.json(food);
	});
});

app.listen(3000);