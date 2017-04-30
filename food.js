var bookshelf = require('./bookshelf.js');
var Category = require('./category');
var Thermal = require('./thermal');

var Food = bookshelf.Model.extend({
	tableName: 'foods',
	category: function() {
		return this.belongsTo(Category);
	},
	thermal: function() {
		return this.belongsTo(Thermal);
	}
});

module.exports = Food;