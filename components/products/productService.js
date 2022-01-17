const Product = require('./productModel');
const Product_Type= require('./productTypeModel');
const { mutipleMongooseToObject } = require('../../conf/util/mongooese');
const { mongooseToObject } = require('../../conf/util/mongooese');

exports.list = async(filter,itemperpage,pageindex) => {
    const products = await Product.find(filter)
    .skip(pageindex*itemperpage)
    .limit(itemperpage);
    return products;
}