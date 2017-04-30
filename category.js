var bookshelf = require('./bookshelf.js');

var Category = bookshelf.Model.extend({
	tableName: 'categories'
});

module.exports = Category;