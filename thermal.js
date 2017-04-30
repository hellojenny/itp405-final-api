var bookshelf = require('./bookshelf.js');

var Thermal = bookshelf.Model.extend({
	tableName: 'thermals'
});

module.exports = Thermal;