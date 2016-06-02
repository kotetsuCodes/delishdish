var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShoppingListSchema = new Schema({
    name: String,
    email: String,
    recipes: Schema.Types.Mixed
});

module.exports = mongoose.model('ShoppingList', ShoppingListSchema);
