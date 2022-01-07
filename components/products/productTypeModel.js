const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const ProductType = new Schema({
    name: { type: String },
    slug: { type: String, slug: ["name"], unique: true },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});
//add plugin
mongoose.plugin(slug);
ProductType.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'});
module.exports = mongoose.model('Product_Type', ProductType);