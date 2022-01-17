const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');



const Schema = mongoose.Schema;
const Product = new Schema({
    name: { type: String },
    description: { type: String },
    detail: { type: String },
    product_type: { type: String },
    color: { type: String },
    price: { type: Number },
    sold: { type: String },
    inventory: { type: String },
    image_url: { type: String },
    slug: { type: String, slug: ["name", "description"], unique: true },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});
//add plugin
mongoose.plugin(slug);
Product.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'});
module.exports = mongoose.model('Product', Product);