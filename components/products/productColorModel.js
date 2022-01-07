const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');



const Schema = mongoose.Schema;
const ProductColor = new Schema({
    color: { type: String },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});
//add plugin
module.exports = mongoose.model('Color', ProductColor);