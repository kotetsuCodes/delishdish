var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuantityTypeSchema = new Schema({
    name: String
});

module.exports = mongoose.model('QuantityType', QuantityTypeSchema);
