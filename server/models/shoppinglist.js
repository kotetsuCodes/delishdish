var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShoppingListSchema = new Schema({
    name: String,
    email: String,
    recipeIds: [{type: Schema.Types.ObjectId, ref: 'Recipe'}]
});

module.exports = mongoose.model('ShoppingList', ShoppingListSchema);
